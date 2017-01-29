module.exports = {
  config: {
    files: {
      javascripts: {
        joinTo: {
          'scripts/vendor.js': /^(?!app|test)/,
          'scripts/app.js': /^app/
        }
      },

      stylesheets: {
        joinTo: {
          'styles/app.css': /^app\//
        }
      },
    }
  }
};

