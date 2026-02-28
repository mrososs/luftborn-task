import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/**
 * Global HTTP error handler.
 * Pipes API errors through MatSnackBar and re-throws for component-level handling.
 */
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';

      if (error.status === 0) {
        message = 'Network error — please check your connection.';
      } else if (error.status === 401) {
        message = 'Unauthorized — please log in again.';
      } else if (error.status === 403) {
        message = 'Forbidden — you do not have permission.';
      } else if (error.status === 404) {
        message = 'Resource not found.';
      } else if (error.status >= 500) {
        message = 'Server error — please try again later.';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      snackBar.open(message, 'Dismiss', {
        duration: 4000,
        panelClass: ['snack-error'],
      });

      return throwError(() => error);
    }),
  );
};
