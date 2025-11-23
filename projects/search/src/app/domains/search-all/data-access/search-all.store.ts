import { Injectable, inject, signal } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { People } from './people';
import { Comapny } from './company';
import { finalize } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SearchAllStore {

    private baseUrlUser = 'http://localhost:8080/mbe-user/api/v1';
    private baseUrlComapny = 'http://localhost:8083/mbe-company/api/v1';

    private http = inject(AuthHttpService);

    private peoplesSignal = signal<People[] | undefined | null>(null);
    private companiesSignal = signal<Comapny[] | undefined | null>(null)

    peoples = this.peoplesSignal.asReadonly();
    companies = this.companiesSignal.asReadonly();

    loadPeoplesByUserInput({ input, filters }: { input : string, filters: string[]}){

        if(!input.trim()){
            this.peoplesSignal.set(null);
            return
        }

        this.peoplesSignal.set(undefined);

        this.http
            .get<People[]>(`${this.baseUrlUser}/users/search?in=${input}&fill=${filters.join(',')}`)
                .subscribe({
                    next: (peoples) => {
                        this.peoplesSignal.set(peoples);
                    },
                    error: () => {
                        this.peoplesSignal.set([]);
                    }
                })
    }

    loadCompaniesByUserInput({ input, filters }: { input : string, filters: string[]}){

        if(!input.trim()){
            this.companiesSignal.set(null);
            return
        }

        this.companiesSignal.set(undefined);

        this.http
            .get<Comapny[]>(`${this.baseUrlComapny}/companies/search?in=${input}&fill=${filters.join(',')}`)
                .subscribe({
                    next: (companies) => {
                        this.companiesSignal.set(companies);
                    },
                    error: () => {
                        this.companiesSignal.set([]);
                    }
                })
    }
    
}