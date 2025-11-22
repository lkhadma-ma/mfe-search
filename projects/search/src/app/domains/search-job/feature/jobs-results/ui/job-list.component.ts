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
          <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-mb-2 mfe-search-text-center">Start Searching Jobs</h3>
          <p class="mfe-search-text-sm mfe-search-text-gray-400 mfe-search-text-center">
            Use the search bar to find jobs that match your skills and interests.
          </p>
        </div>
      }


      @else if (jobs() === undefined) {
        <div class="mfe-search-flex mfe-search-flex-col mfe-search-items-center mfe-search-justify-center max-sm:mfe-search-h-[90vh] mfe-search-h-full mfe-search-p-6 mfe-search-text-gray-500">
          <div class="mfe-search-flex mfe-search-flex-col mfe-search-items-center mfe-search-justify-center mfe-search-p-6 mfe-search-text-gray-500">
            <!-- Spinner -->
            <svg class="mfe-search-animate-spin mfe-search-h-10 mfe-search-w-10 mfe-search-mb-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="mfe-search-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="mfe-search-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="mfe-search-text-lg mfe-search-font-medium mfe-search-text-center">Searching jobs...</p>
            <p class="mfe-search-text-sm mfe-search-text-gray-400 mfe-search-text-center">Please wait while we fetch available positions</p>
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
        <div class="mfe-search-flex mfe-search-flex-col mfe-search-items-center mfe-search-justify-center max-sm:mfe-search-h-[90vh] mfe-search-h-full mfe-search-p-6 mfe-search-text-gray-500">
          <!-- Icon -->
            <svg class="mfe-search-h-10 mfe-search-w-10 mfe-search-mb-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 17h.01" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>


          <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-text-center">
            No jobs found
          </h3>
          <p class="mfe-search-text-sm mfe-search-text-center mfe-search-text-gray-400">
            Try broadening your search or using different keywords.
          </p>
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
