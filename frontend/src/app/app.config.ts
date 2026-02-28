import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/http/auth.http.interpector';
import { AuthStore } from './core/auth/auth.store';

function initAuth() {
  const auth = inject(AuthStore);
  return auth.init();
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initAuth),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
