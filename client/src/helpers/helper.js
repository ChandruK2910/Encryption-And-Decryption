import forge from 'node-forge'
const KEY ='2d5c6d887fc2f553459d93f25dba80f060c3f3aa3a4ff4d6de5289b26ca36773'
const CIPHER_IV ='ddc4b72a5b90db70ea875884de81f366'


export function encrypt(publicKey,data){
    // if(typeof data === 'string'){
    //     const getPublickey = forge.pki.publicKeyFromPem(publicKey)
    //     const encryptData = forge.util.encode64(getPublickey.encrypt(data))
    //     return encryptData;
    // }
    // if(typeof data === 'object'){
        
        const getPublickey = forge.pki.publicKeyFromPem(publicKey)
        const getStringifiedObject = JSON.stringify(data)
        const encryptData = forge.util.encode64(getPublickey.encrypt(getStringifiedObject,'RSA-OAEP'))
        return encryptData;
    // }
}

export function decrypt(privateKey,data){
    // if(typeof data === 'string'){
    //     const getPrivateKey = forge.pki.privateKeyFromPem(privateKey)
    //     const decryptData = getPrivateKey.decrypt(forge.util.decode64(data))
    //     return decryptData;
    // }
    // if(typeof data === 'object'){
        const getPrivateKey = forge.pki.privateKeyFromPem(privateKey)
        const stringifiedDecryptData = getPrivateKey.decrypt(forge.util.decode64(data),'RSA-OAEP')
        const decryptData = JSON.parse(stringifiedDecryptData)
        return decryptData;
    // }
}


export function encryptDataAes(data){
    const cipher = forge.cipher.createCipher('AES-CBC',forge.util.hexToBytes(KEY))
    cipher.start({iv:forge.util.hexToBytes(CIPHER_IV)})
    cipher.update(forge.util.createBuffer(JSON.stringify(data),'utf8'))
    cipher.finish()
    return cipher.output.toHex()
}

export async function decryptDataAes(cipherText){
    const decipher = forge.cipher.createDecipher('AES-CBC',forge.util.hexToBytes(KEY))
    decipher.start({iv : forge.util.hexToBytes(CIPHER_IV)})
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(cipherText)))
    decipher.finish()
    return JSON.parse(decipher.output.toString('utf8'))
}