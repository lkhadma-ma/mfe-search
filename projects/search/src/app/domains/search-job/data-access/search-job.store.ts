import { Injectable, inject, signal } from '@angular/core';
import { SearchJobService } from './search-job.service';
import { Job } from './job';

@Injectable({providedIn: 'root'})
export class SearchJobStore {
    private searchJobService = inject(SearchJobService);

    private jobsSignal = signal<Job[] | undefined>([]);

    jobs = this.jobsSignal.asReadonly();
    
    loadSearchedJobs(input: string){
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