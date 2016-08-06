module.exports = {
  config: {
    files: {
      javascripts: {
        joinTo: {
          'scripts/app.js': /^app\//,
          'scripts/libs.js': /^vendor\/scripts\//
        }
      },

      stylesheets: {
        joinTo: {
          'styles/app.css': /^app\//,
          'styles/libs.css': /^vendor\/styles\//
        }
      },
    },

    plugins: {
      babel: { presets: ['es2015'] }
    }
  }
};
