import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { JobDto } from './job.dto';


@Component({
  selector: 'job-list-item',
  imports: [],
  standalone: true,
  template: `
    <div
      (click)="select.emit(job.id!)"
      [class]="selected()
        ? 'mfe-search-p-4 mfe-search-border-b mfe-search-border-gray-200 mfe-search-bg-blue-50 mfe-search-cursor-pointer mfe-search-border-r-2 mfe-search-border-r-blue-500'
        : 'mfe-search-p-4 mfe-search-border-b mfe-search-border-gray-200 hover:mfe-search-bg-gray-50 mfe-search-cursor-pointer'">
    
      <div class="mfe-search-flex mfe-search-gap-3">
        @if (job.company?.avatar) {
          <img
            [src]="job.company?.avatar"
            [alt]="job.company?.name"
            class="mfe-search-w-12 mfe-search-h-12 mfe-search-rounded-lg mfe-search-object-cover" />
        }
    
        <div class="mfe-search-flex-1 mfe-search-min-w-0">
          <h4 class="mfe-search-text-sm mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-truncate">
            {{ job.position }}
          </h4>
          <p class="mfe-search-text-xs mfe-search-text-gray-600 mfe-search-mt-1 mfe-search-truncate">
            {{ job.company?.name }}
          </p>
          <p class="mfe-search-text-xs mfe-search-text-gray-500 mfe-search-mt-1 mfe-search-truncate">
            {{ job.location }}
          </p>
    
          <div class="mfe-search-flex mfe-search-items-center mfe-search-gap-2 mfe-search-mt-2">
            <span class="mfe-search-text-xs mfe-search-bg-green-100 mfe-search-text-green-800 mfe-search-px-2 mfe-search-py-1 mfe-search-rounded-full">
              {{ job.employmentType }}
            </span>
    
            @if (applied()) {
              <span class="mfe-search-text-xs mfe-search-bg-green-100 mfe-search-text-green-800 mfe-search-px-2 mfe-search-py-1 mfe-search-rounded-full">
                Applied
              </span>
            }
          </div>
        </div>
      </div>
    </div>
    `
})
export class JobListItemComponent {
  @Input() job!: JobDto;
  readonly selected = input(false);
  readonly applied = input(false);

  @Output() select = new EventEmitter<number>();
}
