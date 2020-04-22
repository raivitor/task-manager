const Role = require('../database/models/Role');
const { errorResolver } = require('../util/sequelizeUtil');

module.exports = {
  async list(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'Role not found.' });
      return res.json(role);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async listAll(req, res) {
    try {
      const roles = await Role.findAll({ order: [['id', 'ASC']] });

      return res.json(roles);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async create(req, res) {
    try {
      const role = await Role.create(req.body);

      return res.status(201).json(role);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async update(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) return res.status(404).json({ error: 'Role not found.' });

      const result = await role.update(req.body);

      return res.json(result.dataValues);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (id === 1)
        return res
          .status(406)
          .json({ error: 'It is not allowed to delete this role' });
      const role = await Role.findByPk(id);
      if (!role) return res.status(404).json({ error: 'Role not found.' });
      role.destroy();

      return res.sendStatus(204);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
