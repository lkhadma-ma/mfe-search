import { Injectable, inject, signal } from '@angular/core';
import { SearchJobService } from './search-job.service';
import { CompanySize, EmploymentType, Job, LocationType } from './job';

@Injectable({providedIn: 'root'})
export class SearchJobStore {
    private searchJobService = inject(SearchJobService);

    private jobsSignal = signal<Job[] | undefined>(this.generateJobs(10) as Job[]);

    jobs = this.jobsSignal.asReadonly();
    
    loadSearchedJobs(input: string){
        this.jobsSignal.set(undefined);
        this.searchJobService
            .loadSearchedJobs(input)
                .subscribe({
                    next: (jobs)=>{
                        this.jobsSignal.set(jobs);
                    }
                })
    }

    generateJobs(count: number) {
        const template = {
          position: 'Senior Angular Developer',
          location: 'Spain (Remote)',
          locationType: LocationType.REMOTE,
          description: 'Build and maintain Angular applications ...'.repeat(50),
          employmentType: EmploymentType.FULL_TIME,
          company: {
            username: "10",
            name: 'Tech Innovators',
            avatar: 'https://placehold.co/100x100',
            about: {
              companySize: CompanySize.ELEVEN_TO_FIFTY,
              overview: 'A company focused on innovative web platforms.',
              website: 'https://placehold.co/100x100',
            }
          },
          skills: [
            { value: 1, label: 'Angular' },
            { value: 2, label: 'TypeScript' },
            { value: 3, label: 'RxJS' }
          ]
        };
      
        return Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...template
        }));
      }
      
}