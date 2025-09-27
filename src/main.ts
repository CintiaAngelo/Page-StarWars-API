import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

import { LucideAngularModule } from 'lucide-angular';
import { Play, Users, Film, Globe, Dna, Car, Menu } from 'lucide-angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(), // versão moderna das animações
    importProvidersFrom(
      LucideAngularModule.pick({ Play, Users, Film, Globe, Dna, Car, Menu })
    )
  ]
}).catch(err => console.error(err));
