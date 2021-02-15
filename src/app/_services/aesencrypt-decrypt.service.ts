import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  secretKey = "aaLUNs501NBz4tGIktbh";
  constructor() { }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){

    var obj_json = JSON.parse(textToDecrypt);

    var encrypted = obj_json.ciphertext;
    var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
    var iv = CryptoJS.enc.Hex.parse(obj_json.iv);   

    var key = CryptoJS.PBKDF2(this.secretKey, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});


    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});

    return decrypted.toString(CryptoJS.enc.Utf8);

  }
}
