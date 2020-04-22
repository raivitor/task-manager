const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE
      },
      {
        sequelize
      }
    );
    //this.associate(sequelize.models);
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department'
    });
  }
}

module.exports = Task;
