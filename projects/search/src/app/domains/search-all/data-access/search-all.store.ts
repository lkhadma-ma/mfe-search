import { Injectable, inject, signal } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { AlertService } from '@shared/commun/alert.service';
import { People } from './people';

@Injectable({providedIn: 'root'})
export class SearchAllStore {
    private http = inject(AuthHttpService);
    private alert = inject(AlertService)

    private peoplesSignal = signal<People[]>([]);

    peoples = this.peoplesSignal.asReadonly();
    
}