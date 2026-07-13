import type { SessionPort } from '../../application/ports/session-port';

export class SessionStorageAdapter implements SessionPort {
  hasSession(): boolean {
    return sessionStorage.getItem('session') !== null;
  }
}
