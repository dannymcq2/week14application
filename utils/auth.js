const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
      // If the user is not logged in, redirect them to the login page
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed to the next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;