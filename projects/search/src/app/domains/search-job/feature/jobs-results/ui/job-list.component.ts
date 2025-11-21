import { Component, input, output } from '@angular/core';
import { Job } from '../../../data-access/job';
import { JobListItemComponent } from './job-list-item.component';


@Component({
  selector: 'job-list',
  standalone: true,
  imports: [JobListItemComponent],
  template: `
    <div class="mfe-search-flex-1 mfe-search-overflow-y-auto mfe-search-no-scrollbar">

      @if (jobs() === undefined) {
        <div class="mfe-search-p-4 mfe-search-text-center mfe-search-text-gray-500">
          Searching jobs...
        </div>
      }

      @else if (jobs()!.length > 0) {
        @for (job of jobs(); track job) {
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
  jobs = input<Job[] | undefined>(undefined);
  selectedJobId = input<number | null>(null);
  selectJob =output<number>();
}
