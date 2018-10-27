const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));

module.exports = {
  "presets": babelrc.presets,
  "plugins": babelrc.plugins
}