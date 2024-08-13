const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import Sequelize connection
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the public directory
app.use(express.static('public'));

// Set up Handlebars.js as the template engine without a default layout
const hbs = exphbs.create({
  defaultLayout: false, // Disable the default layout
});

// Configure session middleware
const sess = {
  secret: 'Super secret secret', // Replace with process.env.SESSION_SECRET for production
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js to use Handlebars.js template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync the Sequelize models to the database, then start the Express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});