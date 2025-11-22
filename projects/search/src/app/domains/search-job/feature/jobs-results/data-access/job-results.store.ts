import { Injectable, signal, inject } from '@angular/core';
import { JobResultsService } from './job-results.service';
import { catchError, tap, map, of } from 'rxjs';
import { AlertService } from '@shared/commun/alert.service';

@Injectable({ providedIn: 'root' })
export class JobResultsStore {
    private jobResultsService = inject(JobResultsService);
    private alert = inject(AlertService);

    // Track applied job IDs
    private appliedJobs = signal<Set<number>>(new Set());

    // Check if a job is applied
    isApplied(id: number) {
        return this.appliedJobs().has(id);
    }

    // Apply a job
    applyJob(id: number) {
        this.jobResultsService.applyJob(id)
            .pipe(
                map(() => true),
                catchError(() => {
                    this.alert.show("!Opps We couldn't apply to this job",'error')
                    return of(false);
                }),
                tap(success => {
                    if (success) {
                        const newSet = new Set(this.appliedJobs());
                        newSet.add(id);
                        this.appliedJobs.set(newSet);
                    }
                })
            )
            .subscribe();
    }

    // Optionally, initialize applied jobs from API
    checkAppliedJob(id: number) {
        this.jobResultsService.isAppledJob(id)
            .pipe(
                map(() => true),
                catchError(() => of(false)),
                tap(applied => {
                    if (applied) {
                        const newSet = new Set(this.appliedJobs());
                        newSet.add(id);
                        this.appliedJobs.set(newSet);
                    }
                })
            )
            .subscribe();
    }
}
