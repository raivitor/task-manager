module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  define: {
    timestamps: true,
    underscored: true
  }
};

/*
module.exports = {
  dialect: 'postgres',
  host: 'drona.db.elephantsql.com',
  username: 'pjtoakfz',
  password: '157BAorlAP355iF-nenU20c9ANRSw3M5',
  database: 'pjtoakfz',
  define: {
    timestamps: true,
    underscored: true
  }
};
*/
