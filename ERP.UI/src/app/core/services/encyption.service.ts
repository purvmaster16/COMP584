import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncyptionService {
  private key = CryptoJS.enc.Utf8.parse('b14ca5898a4e4133bbce2ea2315a1916');
  private iv = CryptoJS.enc.Utf8.parse('2b7e151628aed2a6');

  encryptString(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, this.key, { iv: this.iv });
    return encrypted.toString();
  }

  decryptString(cipherText: string): string {
    const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, { iv: this.iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
