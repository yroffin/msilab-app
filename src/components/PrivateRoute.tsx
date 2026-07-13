import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protects member-zone routes.
 * Reads a session marker from sessionStorage — auth implementation will
 * replace this stub when the backend is introduced.
 *
 * NOTE: The session token must never transit through the Service Worker
 * shared cache. Session state lives exclusively in sessionStorage.
 */
function hasSession(): boolean {
  return sessionStorage.getItem('session') !== null;
}

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  if (!hasSession()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
