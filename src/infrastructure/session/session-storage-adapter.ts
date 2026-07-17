import type { SessionPort } from '../../application/ports/session-port';
import { useAuth } from './Authcontext';

export class SessionStorageAdapter implements SessionPort {
    hasSession(): boolean {
        const { user } = useAuth();
        return user !== null;
    }
}
