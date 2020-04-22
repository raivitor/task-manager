const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role_id: DataTypes.INTEGER
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = User;
