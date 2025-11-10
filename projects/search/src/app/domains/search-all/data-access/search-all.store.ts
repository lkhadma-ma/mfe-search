import { Injectable, inject, signal } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { AlertService } from '@shared/commun/alert.service';
import { People } from './people';
import { Comapny } from './company';

@Injectable({providedIn: 'root'})
export class SearchAllStore {

    private baseUrlUser = 'http://localhost:8183/mbe-user/api/v1/';
    private baseUrlComapny = 'http://localhost:8183/mbe-company/api/v1/';

    private http = inject(AuthHttpService);
    private alert = inject(AlertService)

    private peoplesSignal = signal<People[]>([]);
    private companiesSignal = signal<Comapny[]>([])

    peoples = this.peoplesSignal.asReadonly();
    companies = this.companiesSignal.asReadonly();

    loadPeoplesByUserInput({ input, filters }: { input : string, filters: string[]}){
        this.http.get<People[]>(`${this.baseUrlUser}/search?in=${input}&fill=${filters.join(',')}`)
            .subscribe({
                next: (peoples) => {
                    this.peoplesSignal.set(peoples);
                },
                error: () => {
                    this.alert.show('!Opps, Please Refresh Page And Try Again!')
                }
            })
    }

    loadCompaniesByUserInput({ input, filters }: { input : string, filters: string[]}){
        this.http.get<Comapny[]>(`${this.baseUrlComapny}/search?in=${input}&fill=${filters.join(',')}`)
        .subscribe({
            next: (companies) => {
                this.companiesSignal.set(companies);
            },
            error: () => {
                this.alert.show('!Opps, Please Refresh Page And Try Again!')
            }
        })
    }
    
}