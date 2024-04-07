import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm: string = 'aes-256-cbc'; // AES encryption with CBC mode
  private readonly key: Buffer; // Encryption key
  private readonly iv: Buffer; // Initialization vector

  constructor() {
    // Generate a random encryption key and initialization vector
    this.key = randomBytes(32); // 32 bytes for AES-256
    this.iv = randomBytes(16); // 16 bytes for AES
  }

  encrypt(text: string): string {
    // Create a cipher using the algorithm, key, and IV
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  decrypt(encryptedText: string): string {
    // Create a decipher using the algorithm, key, and IV
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);

    // Decrypt the encrypted text
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
