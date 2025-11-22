import { Injectable, inject, signal } from '@angular/core';
import { SearchJobService } from './search-job.service';
import { Job } from './job';

@Injectable({providedIn: 'root'})
export class SearchJobStore {
    private searchJobService = inject(SearchJobService);

    private jobsSignal = signal<Job[] | undefined | null>(null);

    jobs = this.jobsSignal.asReadonly();
    
    loadSearchedJobs(input: string){
        if(input.trim() == ""){
            this.jobsSignal.set(null);
            return;
        }
        this.jobsSignal.set(undefined);
        this.searchJobService
            .loadSearchedJobs(input)
                .subscribe({
                    next: (jobs)=>{
                        this.jobsSignal.set(jobs);
                    },
                    error:()=>{
                        this.jobsSignal.set([]);
                    }
                })
    } 
}