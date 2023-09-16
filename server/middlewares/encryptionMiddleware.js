// Function to encrypt the request body// middleware/encryption.js
const forge = require("node-forge");

function encryptRequestBody(key, iv) {
  return (req, res, next) => {
    const cipher = forge.cipher.createCipher(
      "AES-CBC",
      forge.util.hexToBytes(key)
    );
    cipher.start({ iv: forge.util.hexToBytes(iv) });

    const requestBody = JSON.stringify(req.body);
    const encryptedRequestBody = cipher.update(
      forge.util.createBuffer(requestBody, "utf8")
    );
    cipher.finish();

    req.encryptedBody = encryptedRequestBody.toHex();
    next();
  };
}

function decryptResponseBody(key, iv) {
  return (req, res, next) => {
    const decipher = forge.cipher.createDecipher(
      "AES-CBC",
      forge.util.hexToBytes(key)
    );
    decipher.start({ iv: forge.util.hexToBytes(iv) });

    const responseText = res.locals.responseText;
    const decryptedResponseBody = decipher.update(
      forge.util.createBuffer(forge.util.hexToBytes(responseText))
    );
    decipher.finish();

    res.json(JSON.parse(decryptedResponseBody.toString("utf8")));
  };
}

module.exports = { encryptRequestBody, decryptResponseBody };
