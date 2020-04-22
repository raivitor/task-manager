const crypto = require('crypto');
const User = require('../database/models/User');
const { errorResolver } = require('../util/sequelizeUtil');
const { generateToken } = require('../util/auth');

module.exports = {
  async list(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        include: {
          attributes: ['id', 'name', 'routes_permission'],
          association: 'role'
        }
      });
      if (!user) return res.status(404).json({ error: 'User not found.' });
      return res.json(user);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async listAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        include: {
          attributes: ['id', 'name', 'routes_permission'],
          association: 'role'
        },
        order: [['id', 'ASC']]
      });

      return res.json(users);
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async create(req, res) {
    const { name, email, password, role_id } = req.body;
    try {
      if (await User.findOne({ where: { email } }))
        return res.status(400).send({ error: 'Email in use.' });
      const hash = crypto.createHash('sha256').update(password).digest('hex');

      const user = await User.create({
        name,
        password: hash,
        email,
        role_id
      });
      user.password = undefined;
      return res
        .status(201)
        .json({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      errorResolver(err, res);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    // Só admin ou o próprio usuário podem alterar um user
    if (!(req.userId === id || req.permissions.includes('all'))) {
      return res
        .status(403)
        .send({ error: 'Forbidden update for this role or id' });
    }

    // Se não for admin, o user não pode alterar o role_id
    // se for super-admin também não poderá ter a role alterada
    if ((!req.permissions.includes('all') && req.body.role_id) || id == 1) {
      req.body.role_id = undefined;
    }

    const { name, email, password, role_id } = req.body;

    try {
      if (email) {
        if (await User.findOne({ where: { email } }))
          return res.status(400).send({ error: 'Email in use.' });
      }
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      const hash = password
        ? crypto.createHash('sha256').update(password).digest('hex')
        : user.password;

      const result = await user.update({
        name: name || user.name,
        email: email || user.email,
        password: hash,
        role_id: role_id || user.role_id
      });

      //result.password = undefined;
      return res.json(result);
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
          .json({ error: 'It is not allowed to delete this user' });
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'User not found.' });
      user.destroy();

      return res.sendStatus(204);
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
