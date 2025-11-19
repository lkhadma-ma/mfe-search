import { Component, EventEmitter, Output, input } from '@angular/core';
import { JobDto } from './job.dto';
import { JobListItemComponent } from './job-list-item.component';


@Component({
  selector: 'job-list',
  standalone: true,
  imports: [JobListItemComponent],
  template: `
    <div class="mfe-search-flex-1 mfe-search-overflow-y-auto">
      @if (isSearching()) {
        <div class="mfe-search-p-4 mfe-search-text-center mfe-search-text-gray-500">
          Searching jobs...
        </div>
      }
    
      @if (!isSearching() && jobs().length === 0) {
        <div class="mfe-search-p-4 mfe-search-text-center mfe-search-text-gray-500">
          No jobs found. Try a different search.
        </div>
      }
    
      @if (!isSearching()) {
        @for (job of jobs(); track trackByJob($index, job)) {
          <job-list-item
            [job]="job"
            [selected]="selectedJobId() === job.id"
            [applied]="appliedJobs().has(job.id!)"
            (select)="selectJob.emit($event)"
          ></job-list-item>
        }
      }
    </div>
    `
})
export class JobListComponent {
  readonly jobs = input<JobDto[]>([]);
  readonly selectedJobId = input<number | null>(null);
  readonly appliedJobs = input<Set<number>>(new Set());
  readonly isSearching = input(false);

  @Output() selectJob = new EventEmitter<number>();

  trackByJob(_: number, item: JobDto) {
    return item.id;
  }
}
