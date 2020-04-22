const Department = require('../database/models/Department');
const { errorResolver } = require('../util/sequelizeUtil');

module.exports = {
  async list(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (!department)
        return res.status(404).json({ error: 'Department not found.' });
      return res.json(department);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async listAll(req, res) {
    try {
      const departments = await Department.findAll({ order: [['id', 'ASC']] });

      return res.json(departments);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async create(req, res) {
    try {
      const department = await Department.create(req.body);

      return res.status(201).json(department);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async update(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (!department)
        return res.status(404).json({ error: 'Department not found.' });

      const result = await department.update(req.body);

      return res.json(result.dataValues);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async delete(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (!department)
        return res.status(404).json({ error: 'Department not found.' });
      department.destroy();

      return res.sendStatus(204);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
