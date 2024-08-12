const sequelize = require('../config/connection');
const { User } = require('../models');
const fs = require('fs');
const path = require('path');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Load user data from userdata.json
  const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'userdata.json'), 'utf-8'));

  // Bulk create users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();