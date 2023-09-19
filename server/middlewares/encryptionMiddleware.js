// Function to encrypt the request body// middleware/encryption.js
const forge = require("node-forge");


// function encryptRequestBody(key, iv) {
//   return (req, res, next) => {
//     const cipher = forge.cipher.createCipher(
//       "AES-CBC",
//       forge.util.hexToBytes(key)
//     );
//     cipher.start({ iv: forge.util.hexToBytes(iv) });

//     const requestBody = JSON.stringify(req.body);
//     const encryptedRequestBody = cipher.update(
//       forge.util.createBuffer(requestBody, "utf8")
//     );
//     cipher.finish();

//     req.encryptedBody = encryptedRequestBody.toHex();
//     next();
//   };
// }

// function decryptResponseBody() {
//   return (req, res, next) => {
//     const decipher = forge.cipher.createDecipher(
//       "AES-CBC",
//       forge.util.hexToBytes(process.env.KEY)
//     );
//     decipher.start({ iv: forge.util.hexToBytes(process.env.CIPHER_IV) });
//    decipher.update(
//       forge.util.createBuffer(forge.util.hexToBytes(req.body))
//     );
//     decipher.finish();
//     req.requestBody = decipher.output.toString('utf8')
//     next();

//     // res.json(JSON.parse(decryptedResponseBody.toString("utf8")));
//   };
// }

const encryptResponseBody = (cipherText)=>{
  try {
    const cipher = forge.cipher.createCipher('AES-CBC',forge.util.hexToBytes(process.env.KEY))
  cipher.start({iv:forge.util.hexToBytes(process.env.CIPHER_IV)})
  cipher.update(forge.util.createBuffer(JSON.stringify(cipherText),'utf8'))
  cipher.finish()
  return cipher.output.toHex()
  } catch (error) {
    return error.message
  }
}

const decryptRequestBody = (req,res,next)=>{
console.log(req.body)
  try {
    if(['POST','PUT','PATCH'].includes(req.method)){
      const decipher = forge.cipher.createDecipher(
        "AES-CBC",
        forge.util.hexToBytes(process.env.KEY)
      );
      decipher.start({ iv: forge.util.hexToBytes(process.env.CIPHER_IV) });
     decipher.update(
        forge.util.createBuffer(forge.util.hexToBytes(req.body.encryptRequest))
      );
      decipher.finish();
      console.log(decipher.output.toString('utf8'))
      req.body = JSON.parse(decipher.output.toString('utf8'))
      next();
    }
    if(req.method == 'GET' || req.method == 'DELETE'){
      next()
    }
    
  } catch (error) {
    return res.status(500).json({message :'internal server error',error: error.message})
  }
}



module.exports = { encryptResponseBody, decryptRequestBody };
