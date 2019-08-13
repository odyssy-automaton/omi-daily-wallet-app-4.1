const { join } = require('path');
const { lstatSync, realpathSync } = require('fs');

let watchFolders = [];

try {
  let path = join(__dirname, 'node_modules', '@archanova', 'wallet-sdk');
  const stats = lstatSync(path);
  if (stats.isSymbolicLink()) {
    watchFolders = [
      realpathSync(path),
    ];
  }
} catch (err) {
  watchFolders = [];
}

module.exports = {
  resolver: {
    extraNodeModules: require("node-libs-browser")
  },
  watchFolders
};