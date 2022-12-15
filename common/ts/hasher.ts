import CryptoJS, { SHA256 } from 'crypto-js';
import create from 'keccak';

export class Hasher {

  static keckka256(input: Buffer): Buffer {
    return create('keccak256').update(input).digest();
  }

  static sha256(input: Buffer): Buffer {
    const words = CryptoJS.enc.Hex.parse(input.toString('hex'));
    return Buffer.from(SHA256(words).toString(), 'hex');
  }
}
