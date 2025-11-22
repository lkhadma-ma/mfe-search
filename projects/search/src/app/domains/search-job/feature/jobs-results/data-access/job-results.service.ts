import { Injectable, inject } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';


@Injectable({
    providedIn: 'root'
})
export class JobResultsService {
    private url= 'http://localhost:8083/mbe-company/api/v1'; 
    private http = inject(AuthHttpService);
    
    applyJob(id: number){
        return this.http.get(`${this.url}/applications/apply?id=${id}`)
    }

    isAppledJob(id: number){
        return this.http.get(`${this.url}/applications/apply/check?id=${id}`)
    }

}