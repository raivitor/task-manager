const { check, param, query } = require('express-validator');
import { validationResult } from 'express-validator';

const TASK_STATUS = ['OPEN', 'IN_PROGRESS', 'FINISHED'];
export const validateIdParam = [param('id').toInt().isInt()];
export const validateAuth = [
  check('email').isEmail(),
  check('password').notEmpty()
];

export const validateUser = [
  check('name').notEmpty().trim(),
  check('email').isEmail(),
  check('password').notEmpty(),
  check('role_id').toInt().isInt()
];

export const validateTask = [
  check('description').notEmpty().trim(),
  check('status')
    .notEmpty()
    .trim()
    .customSanitizer(value => {
      return value.toUpperCase();
    })
    .isIn(TASK_STATUS),
  check('user_id').toInt().isInt(),
  check('department_id').toInt().isInt(),
  check('start_time').isISO8601('yyyy-mm-dd').optional(),
  check('end_time').isISO8601('yyyy-mm-dd').optional()
];

export const validateTaskQuery = [
  query('user').toInt().isInt().optional(),
  query('department').toInt().isInt().optional(),
  query('description').notEmpty().trim().optional(),
  query('status')
    .notEmpty()
    .trim()
    .customSanitizer(value => {
      return value.toUpperCase();
    })
    .isIn(TASK_STATUS)
    .optional(),
  query('startDate').isISO8601('yyyy-mm-dd').optional(),
  query('endDate').isISO8601('yyyy-mm-dd').optional(),
  query('creationDate').isISO8601('yyyy-mm-dd').optional(),
  query('sort').notEmpty().trim().optional(),
  query('page').toInt().isInt().optional(),
  query('limit').toInt().isInt().optional()
];

export const validateRole = [
  check('name').notEmpty().trim(),
  check('routes_permission')
    .isArray()
    .customSanitizer(value => {
      if (typeof value[0] == 'string') return [value[0].toLowerCase()];
      if (typeof value[0] == 'object') {
        return value.map(item => {
          if (item.route && item.methods) {
            item.route = item.route.toLowerCase();
            item.methods = item.methods.map(method => method.toLowerCase());
          }
          return item;
        });
      }
    })
    .custom(value => {
      if (typeof value[0] == 'string' && value[0] == 'all') return value;
      if (typeof value[0] == 'object') {
        const hasValue = value.filter(item => {
          if (
            item.route &&
            item.methods &&
            item.route.length > 0 &&
            item.methods.length > 0
          )
            return item;
        }).length;
        console.log(hasValue);
        return hasValue;
      }
    })
];

export const validateDepartment = [check('name').notEmpty().trim()];

export const validate = (validations, optional = false) => {
  return async (req, res, next) => {
    await Promise.all(
      validations.map(validation =>
        optional ? validation.optional().run(req) : validation.run(req)
      )
    );

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};
