import { Component, input, output } from '@angular/core';
import { Job } from '../../../data-access/job';
import { JobListItemComponent } from './job-list-item.component';


@Component({
  selector: 'job-list',
  standalone: true,
  imports: [JobListItemComponent],
  template: `
    <div class="mfe-search-flex-1 mfe-search-overflow-y-auto mfe-search-no-scrollbar">

      @if (jobs() === null) {
        <div class="mfe-search-flex mfe-search-flex-col mfe-search-items-center mfe-search-justify-center max-sm:mfe-search-h-[90vh] mfe-search-h-full mfe-search-p-6 mfe-search-text-gray-500">
          <!-- Icon -->
          <svg class="mfe-search-h-12 mfe-search-w-12 mfe-search-mb-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-mb-2">Start Searching Jobs</h3>
          <p class="mfe-search-text-sm mfe-search-text-gray-400 text-center">
            Use the search bar to find jobs that match your skills and interests.
          </p>
        </div>
      }


      @else if (jobs() === undefined) {
        <div class="mfe-search-p-4 mfe-search-text-center mfe-search-text-gray-500 max-sm:mfe-search-h-[90vh] mfe-search-h-full">
          <div class="mfe-search-flex mfe-search-flex-col mfe-search-items-center mfe-search-justify-center mfe-search-p-6 mfe-search-text-gray-500">
            <!-- Spinner -->
            <svg class="mfe-search-animate-spin mfe-search-h-10 mfe-search-w-10 mfe-search-mb-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="mfe-search-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="mfe-search-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="mfe-search-text-lg mfe-search-font-medium">Searching jobs...</p>
            <p class="mfe-search-text-sm mfe-search-text-gray-400">Please wait while we fetch available positions</p>
          </div>
        </div>
      }

      @else if (jobs()!.length > 0) {
        @for (job of jobs(); track trackJob(job)) {
          <job-list-item
            [job]="job"
            [selected]="selectedJobId() === job.id"
            (select)="selectJob.emit($event)"
          ></job-list-item>
        }
      } 
      
      @else {
        <div class="mfe-search-p-4 mfe-search-text-center mfe-search-text-gray-500">
          No jobs found. Try a different search.
        </div>
      }
  
    </div>
    `
})
export class JobListComponent {
  jobs = input<Job[] | undefined | null>(null);
  selectedJobId = input<number | null>(null);
  selectJob =output<number>();

  trackJob(job: Job) {
    return job.id; 
  }
}
