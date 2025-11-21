import { Injectable, inject } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { Job } from './job';

@Injectable({
    providedIn: 'root'
})
export class SearchJobService {
    private url= 'http://localhost:8083/mbe-company/api/v1'; 
    private http = inject(AuthHttpService);
    
    loadSearchedJobs(input: string){
        return this.http.get<Job[]>(`${this.url}/jobs/search?in=${this.convertInputToQuery(input)}`)
    }

    private convertInputToQuery(input: string) {
        return input.trim().split(' ').map(m=> m.trim()).join("-") ?? ''
    }
}