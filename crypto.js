const zlib = require('zlib')

module.exports = class crypto {

    xor(str, key) {     
        str = String(str).split('').map(letter => letter.charCodeAt());
        let res = "";
        for (let i = 0; i < str.length; i++) res += String.fromCodePoint(str[i] ^ key);
        return res; 
    }

    decode(data) {
        console.log("Decoding...")
        if (data.startsWith('<?xml version="1.0"?>')) return data
        let decoded = this.xor(data, 11)
        decoded = Buffer.from(decoded, 'base64')
        try { return zlib.unzipSync(decoded).toString() }
        catch (e) { return console.log("Error! GD save file seems to be corrupt!") }
    }

}