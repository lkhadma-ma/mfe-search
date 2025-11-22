import { Injectable, inject, signal } from '@angular/core';
import { SearchJobService } from './search-job.service';
import { Job } from './job';
import { ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class SearchJobStore {
    private searchJobService = inject(SearchJobService);
    private route = inject(ActivatedRoute);

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

    loadJobByIdWithSimilarJobs(id: number){
        this.jobsSignal.set(undefined);
        this.searchJobService
            .loadJobByIdWithSimilarJobs(id)
                .subscribe({
                    next: (jobs)=>{
                        this.jobsSignal.set(jobs);
                    },
                    error:()=>{
                        this.jobsSignal.set([]);
                    }
                })
    }

    listner() {
        this.route.queryParamMap.subscribe(params => {
            const idParam = params.get('currentId');
        
            if (idParam) {
              const id = Number(idParam);
        
              if (this.jobs()?.some(j => j.id === id)) {
                return;
              }

              this.loadJobByIdWithSimilarJobs(id);
            }
        });
    }
}