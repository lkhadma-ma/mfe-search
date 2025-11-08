import { Component, input, output } from '@angular/core';
import { JobView } from '../data-access/job';
import { PencilComponent } from "@shared/ui/pencil/pencil.component";
import { TrashComponent } from "@shared/ui/trash/trash.component";

@Component({
  selector: 'mfe-search-job',
  host: { class: 'mfe-search-w-full sm:mfe-search-w-[16rem] mfe-search-cursor-pointer mfe-search-relative' },
  template: `
  @if(isCurrentsearch()) {
    <mfe-search-pencil (click)="onEdit.emit()"></mfe-search-pencil>
    <mfe-search-trash (click)="onDelete.emit()"></mfe-search-trash>
  }

  @let jobIn = jobView();
  @if (jobIn) {
    <div class="mfe-search-w-full mfe-search-flex mfe-search-flex-col mfe-search-space-y-2 mfe-search-border mfe-search-rounded-xl mfe-search-bg-white mfe-search-p-4">
      <img loading="lazy"
          class=" mfe-search-w-full mfe-search-bg-cover mfe-search-bg-center mfe-search-max-h-[100px] mfe-search-max-w-[100px] mfe-search-rounded-t-md"
          [src]="jobIn.search.avatar"
          alt="bg"
        />  
      <h2 class="mfe-search-text-md mfe-search-font-bold mfe-search-mb-2">{{jobIn.position}}</h2>
      <p class="mfe-search-text-sm mfe-search-text-gray-700 mfe-search-mb-4">{{jobIn.description.substring(0,38)}}...</p>
      <p class="mfe-search-text-sm mfe-search-text-gray-700 mfe-search-mb-4 mfe-search-mt-4 mfe-search-font-medium"><small>{{getValueOptionLocalType(jobIn.locationType)}}</small></p>
    </div>
  }
  `,
  imports: [PencilComponent, TrashComponent]
})
export class JobComponent {
  jobView = input<JobView>();
  isCurrentsearch = input<boolean>(false);
  onEdit = output<void>();
  onDelete = output<void>();

  optionsLocalType = [
    { value: 'REMOTE', label: 'Remote' },
    { value: 'HYBRID', label: 'Hybrid' },
    { value: 'ON_SITE', label: 'On-site'}
  ];

  getValueOptionLocalType(value: string) {
    const option = this.optionsLocalType.find(option => option.value === value);
    return option ? option.label : value;
  }
}
