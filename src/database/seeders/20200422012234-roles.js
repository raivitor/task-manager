'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'SUPER-ADMIN',
          routes_permission: JSON.stringify(['all']),
          created_at: 'NOW()',
          updated_at: 'NOW()'
        },
        {
          name: 'AGENT',
          routes_permission: JSON.stringify([
            {
              route: 'user',
              routes_permission: ['get', 'put']
            },
            {
              route: 'task',
              routes_permission: ['post', 'put']
            }
          ]),
          created_at: 'NOW()',
          updated_at: 'NOW()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
