import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
// This is a class for hashing and verifying passwords.
// It ensures that passwords are not stored in plain text in the database.
export class CryptoHelper {
  public static hashPassword(password: string): {
    hash: string;
    salt: string;
  } {
    const salt = this.getSalt();
    const buffer = pbkdf2Sync(password, salt, 1000, 64, `sha512`);
    const hash = buffer.toString('hex');
    return { hash, salt };
  }

  public static async compare(
    password: string,
    hashString: string,
    salt: string,
  ): Promise<boolean> {
    const buffer = pbkdf2Sync(password, salt, 1000, 64, `sha512`);

    const hash = buffer.toString('hex');
    const a = Buffer.from(hashString);
    const b = Buffer.from(hash);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  private static getSalt(): string {
    return randomBytes(16).toString('hex');
  }
}
