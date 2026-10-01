import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { environment } from '../config/environment.js';
import type { AdministratorRepository } from '../repositories/administrador.repository.js';

const secret = new TextEncoder().encode(environment.jwtSecret);

export class AuthService {
  constructor(private readonly administrators: AdministratorRepository) {}

  async login(usuario: string, contrasena: string): Promise<string | null> {
    const administrator = await this.administrators.findByUsername(usuario);
    if (!administrator) return null;

    const isHash = /^\$2[aby]\$/.test(administrator.contrasena);
    const valid = isHash
      ? await bcrypt.compare(contrasena, administrator.contrasena)
      : contrasena === administrator.contrasena;
    if (!valid) return null;

    if (!isHash) {
      const hash = await bcrypt.hash(contrasena, environment.bcryptRounds);
      await this.administrators.updatePassword(administrator.identificador, hash);
    }

    return new SignJWT({ usuario: administrator.usuario })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(String(administrator.identificador))
      .setIssuedAt()
      .setExpirationTime(environment.jwtExpiresIn)
      .sign(secret);
  }
}
