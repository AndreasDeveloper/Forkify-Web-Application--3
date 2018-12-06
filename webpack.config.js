const path = require('path');   // path package, stored in path const var.

module.exports = {
    entry: './src/js/index.js', // Entry point
    output: {
        path: path.resolve(__dirname, 'dist/js'),   // Outputs bundle to this directory
        filename: 'bundle.js'   // with this filename
    },
};