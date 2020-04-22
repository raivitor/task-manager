const User = require('../database/models/User');
module.exports = async (req, res, next) => {
  req.userId = 1;

  const role = await User.findByPk(req.userId, {
    attributes: [],
    include: {
      attributes: ['routes_permission'],
      association: 'role'
    }
  });

  const routes_allowed = role.role.routes_permission;
  const path = req.route.path.split('/')[1];
  const method = req.route.stack[0].method;

  req.permissions = routes_allowed;
  if (routes_allowed.includes('all')) return next();

  const hasPermission = routes_allowed.filter(item => {
    if (item.route === path) {
      if (item.methods.includes('*') || item.methods.includes(method))
        return item;
    }
  }).length;

  return hasPermission
    ? next()
    : res.status(403).send({ error: 'Forbidden route for this role' });
};
