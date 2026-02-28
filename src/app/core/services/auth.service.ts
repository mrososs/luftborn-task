import { Injectable, signal, computed } from '@angular/core';
import { User, AuthPayload } from '../../models/user.model';

/**
 * Singleton service managing authentication state via Signals.
 * Injected globally via core.providers.ts.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly _accessToken = signal<string | null>(null);

  /** Read-only signal exposing the current authenticated user */
  readonly currentUser = this._currentUser.asReadonly();

  /** Read-only signal exposing the raw access token for the auth interceptor */
  readonly accessToken = this._accessToken.asReadonly();

  /** Computed: true when user is authenticated */
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  /**
   * Stores auth payload from login response.
   * @param payload - The JWT auth payload returned by the login API
   */
  setAuth(payload: AuthPayload): void {
    this._currentUser.set(payload.user);
    this._accessToken.set(payload.accessToken);
  }

  /** Clears auth state on logout */
  clearAuth(): void {
    this._currentUser.set(null);
    this._accessToken.set(null);
  }
}
