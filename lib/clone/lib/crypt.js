var crypto = require("crypto");

module.exports = {
  encrypt: function(text) {
    var cipher, crypted;
    cipher  = crypto.createCipher("aes-256-cbc", "your-super-complex-hash-here");
    crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  },
  decrypt: function(text) {
    var dec, decipher;
    decipher = crypto.createDecipher("aes-256-cbc", "your-super-complex-hash-here");
    dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }
};
