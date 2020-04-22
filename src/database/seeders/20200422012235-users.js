'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password:
            '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
          role_id: 1,
          created_at: 'NOW()',
          updated_at: 'NOW()'
        },
        {
          name: 'agent',
          email: 'agent@gmail.com',
          password:
            '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
          role_id: 2,
          created_at: 'NOW()',
          updated_at: 'NOW()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
