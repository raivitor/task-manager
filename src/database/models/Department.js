const { Model, DataTypes } = require('sequelize');

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'departments'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: 'department_id',
      as: 'tasks'
    });
  }
}

module.exports = Department;
