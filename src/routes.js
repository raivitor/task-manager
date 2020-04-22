import { Router } from 'express';

const UserCtrl = require('./controllers/UserCtrl');
const DepartmentCtrl = require('./controllers/DepartmentCtrl');
const TaskCtrl = require('./controllers/TaskCtrl');
const RoleCtrl = require('./controllers/RoleCtrl');
const AuthCtrl = require('./controllers/AuthCtrl');
const ReportCtrl = require('./controllers/ReportCtrl');
const auth = require('./middlewares/auth');
const permission = require('./middlewares/permission');
const {
  validate,
  validateIdParam,
  validateAuth,
  validateDepartment,
  validateUser,
  validateTask,
  validateTaskQuery,
  validateRole
} = require('./middlewares/validation');

const routes = new Router();

routes.use(auth);

routes.post('/auth/login', validate(validateAuth), AuthCtrl.auth);

routes.get('/department', permission, DepartmentCtrl.listAll);
routes.post(
  '/department',
  permission,
  validate(validateDepartment),
  DepartmentCtrl.create
);
routes.get(
  '/department/:id',
  permission,
  validate(validateIdParam),
  DepartmentCtrl.list
);
routes.put(
  '/department/:id',
  permission,
  validate([...validateIdParam, ...validateDepartment]),
  DepartmentCtrl.update
);
routes.delete(
  '/department/:id',
  permission,
  validate(validateIdParam),
  DepartmentCtrl.delete
);

routes.get('/user', permission, UserCtrl.listAll);
routes.post('/user', permission, validate(validateUser), UserCtrl.create);
routes.get('/user/:id', permission, validate(validateIdParam), UserCtrl.list);
routes.put(
  '/user/:id',
  permission,
  validate(validateIdParam),
  validate(validateUser, true),
  UserCtrl.update
);
routes.delete(
  '/user/:id',
  permission,
  validate(validateIdParam),
  UserCtrl.delete
);

routes.get('/task', permission, validate(validateTaskQuery), TaskCtrl.listAll);
routes.post('/task/', permission, validate(validateTask), TaskCtrl.create);
routes.get('/task/:id', permission, validate(validateIdParam), TaskCtrl.list);
routes.put(
  '/task/:id',
  permission,
  validate(validateIdParam),
  validate(validateTask, true),
  TaskCtrl.update
);
routes.delete(
  '/task/:id',
  permission,
  validate(validateIdParam),
  TaskCtrl.delete
);

routes.get('/role', permission, RoleCtrl.listAll);
routes.post('/role/', permission, validate(validateRole), RoleCtrl.create);
routes.get('/role/:id', permission, validate(validateIdParam), RoleCtrl.list);
routes.put(
  '/role/:id',
  permission,
  validate(validateIdParam),
  validate(validateRole, true),
  RoleCtrl.update
);
routes.delete(
  '/role/:id',
  permission,
  validate(validateIdParam),
  RoleCtrl.delete
);

routes.get('/report/users', permission, ReportCtrl.userReport);
routes.get('/report/departments', permission, ReportCtrl.departmentsReport);

export default routes;
