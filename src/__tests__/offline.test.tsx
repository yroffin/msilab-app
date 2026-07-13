import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PublicPage from '../pages/PublicPage';
import PrivateRoute from '../components/PrivateRoute';
import MembersPage from '../pages/MembersPage';

/**
 * Offline non-regression tests for the public zone.
 *
 * These tests verify that PublicPage renders without any dependency on network
 * or session state — simulating a cached offline load by the Service Worker.
 */
describe('Public zone — offline non-regression', () => {
  it('renders public page without session or network', () => {
    render(
      <MemoryRouter>
        <PublicPage />
      </MemoryRouter>
    );
    expect(screen.getByText('MSILab App')).toBeInTheDocument();
  });

  it('shows offline-friendly messaging', () => {
    render(
      <MemoryRouter>
        <PublicPage />
      </MemoryRouter>
    );
    const matches = screen.getAllByText(/hors-ligne/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});

/**
 * PrivateRoute guard tests — member navigation without a session should
 * redirect to the public zone, never rendering member content.
 */
describe('PrivateRoute — session guard', () => {
  it('redirects to / when no session exists', () => {
    sessionStorage.clear();
    render(
      <MemoryRouter initialEntries={['/members']}>
        <PrivateRoute>
          <MembersPage />
        </PrivateRoute>
      </MemoryRouter>
    );
    // MembersPage content must not appear
    expect(screen.queryByText('Espace membres')).not.toBeInTheDocument();
  });

  it('renders members page when session is set', () => {
    sessionStorage.setItem('session', 'stub-token');
    render(
      <MemoryRouter initialEntries={['/members']}>
        <PrivateRoute>
          <MembersPage />
        </PrivateRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Espace membres')).toBeInTheDocument();
    sessionStorage.clear();
  });
});
