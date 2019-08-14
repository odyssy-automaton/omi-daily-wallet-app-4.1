if (typeof __dirname === "undefined") global.__dirname = "/";
if (typeof __filename === "undefined") global.__filename = "";
if (typeof process === "undefined") {
  global.process = require("process");
} else {
  const bProcess = require("process");
  for (const p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === "boolean" && __DEV__;
process.env["NODE_ENV"] = isDev ? "development" : "production";
if (typeof localStorage !== "undefined") {
  localStorage.debug = isDev ? "*" : "";
}

// Make sure crypto gets loaded first, so it can populate global.crypto
// require('crypto');

if (!String.prototype.normalize) {
  require("unorm");
}

let crypto;
if (typeof window === "object") {
  if (!window.crypto) window.crypto = {};
  crypto = window.crypto;
} else {
  crypto = require("crypto");
}

if (!crypto.getRandomValues) {
  crypto.getRandomValues = getRandomValues;
}

let randomBytes;

function getRandomValues(arr) {
  if (!randomBytes)
    randomBytes = require("react-native-randombytes").randomBytes;

  const bytes = randomBytes(arr.length);
  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes[i];
  }
}
