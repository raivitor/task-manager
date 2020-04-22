const crypto = require('crypto');
const User = require('../database/models/User');
const { errorResolver } = require('../util/sequelizeUtil');
const { generateToken } = require('../util/auth');

module.exports = {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).send({ error: 'User not found' });
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      if (user.password != hash)
        return res.status(400).send({ error: 'Senha errada' });

      user.password = undefined;

      res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      errorResolver(err, res);
    }
  }
};
