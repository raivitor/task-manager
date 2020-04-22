const Task = require('../database/models/Task');
const { Op } = require('sequelize');
const { errorResolver, paginate } = require('../util/sequelizeUtil');

module.exports = {
  async list(req, res) {
    try {
      const task = await Task.findByPk(req.params.id, {
        include: { attributes: ['id', 'name', 'email'], association: 'user' }
      });
      if (!task) return res.status(404).json({ error: 'Task not found.' });
      return res.json(task);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async listAll(req, res) {
    try {
      const {
        user,
        department,
        description,
        status,
        startDate,
        endDate,
        creationDate,
        sort,
        page,
        limit
      } = req.query;

      const tasks = await Task.findAll({
        where: {
          [Op.and]: [
            description
              ? {
                  description: {
                    [Op.iLike]: `%${description}%`
                  }
                }
              : {},
            status
              ? {
                  status: {
                    [Op.iLike]: `%${status}%`
                  }
                }
              : {},
            startDate
              ? {
                  start_time: {
                    [Op.gte]: startDate
                  }
                }
              : {},
            endDate
              ? {
                  end_time: {
                    [Op.gte]: endDate
                  }
                }
              : {},
            creationDate
              ? {
                  createdAt: {
                    [Op.gte]: creationDate
                  }
                }
              : {}
          ]
        },
        order: sort ? [['id', sort]] : [],
        include: [
          {
            association: 'user',
            attributes: ['id', 'name', 'email', 'role_id'],
            where: user ? { id: user } : {}
          },
          {
            association: 'department',
            attributes: ['id', 'name'],
            where: department ? { id: department } : {}
          }
        ],
        ...paginate(page, limit)
      });

      return res.json(tasks);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async create(req, res) {
    try {
      const task = await Task.create(req.body);

      return res.status(201).json(task);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async update(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found.' });

      if (req.body.status == 'IN_PROGRESS' && !req.body.start_time) {
        req.body.start_time = Date.now();
      }
      if (req.body.status == 'FINISHED' && !req.body.end_time) {
        req.body.end_time = Date.now();
      }
      const result = await task.update(req.body);

      return res.json(result);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async delete(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found.' });
      task.destroy();

      return res.sendStatus(204);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
