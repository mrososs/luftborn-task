import { importProvidersFrom, Provider, EnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

/**
 * Returns all core-level providers to register in app.config.ts.
 * Includes HttpClient with auth + error interceptors, browser animations, dialog, and snackbar.
 */
export function provideCore(): (Provider | EnvironmentProviders)[] {
  return [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    importProvidersFrom(MatDialogModule, MatSnackBarModule),
  ];
}
