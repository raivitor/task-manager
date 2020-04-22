const sequelize = require('sequelize');
const Department = require('../database/models/Department');
const User = require('../database/models/User');
const { errorResolver } = require('../util/sequelizeUtil');

const attributes = [
  [
    sequelize.literal(
      "(SELECT COUNT(tasks.id) filter (WHERE tasks.status = 'FINISHED'))"
    ),
    'completed_tasks'
  ],
  [
    sequelize.literal('AVG(tasks.start_time - tasks.created_at)'),
    'average_time_task_start'
  ],
  [
    sequelize.literal('AVG(tasks.end_time - tasks.start_time)'),
    'average_completion_time'
  ],
  'name'
];
module.exports = {
  async userReport(req, res) {
    try {
      const userReport = await User.findAll({
        attributes: [...attributes, 'email'],
        include: [
          {
            association: 'tasks',
            attributes: []
          }
        ],
        group: ['User.id']
      });

      return res.json(userReport);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async departmentsReport(req, res) {
    try {
      const departmentReport = await Department.findAll({
        attributes,
        include: [
          {
            association: 'tasks',
            attributes: []
          }
        ],
        group: ['Department.id']
      });

      return res.json(departmentReport);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
