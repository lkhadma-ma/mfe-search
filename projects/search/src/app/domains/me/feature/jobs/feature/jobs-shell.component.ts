import { Component, OnInit, ViewChild, inject, input, signal } from '@angular/core';
import { SectionComponent } from "./../ui/section.component";
import { JobComponent } from "../ui/job.component";
import { JobsStore } from '../data-access/jobs.store';
import { Job } from '../data-access/job';
import { PlusComponent } from "@shared/ui/plus/plus.component";
import { FormJobComponent } from "../ui/form-job.component";
import { SearchBoxComponent } from "../ui/search-box.component";
import { SearchComponent } from "@shared/ui/search/search.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mfe-search-jobs-shell',
  host: { class: 'mfe-search-w-full mfe-search-space-y-4' },
  template: `
  <mfe-search-section>
    <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-5 mfe-user-flex mfe-user-justify-between">
      Jobs
      @if(isCurrentsearch()) {
        <div class="mfe-search-flex mfe-search-items-center mfe-search-gap-4">
          <mfe-search-search
            (click)="toggleIsSearchingActive()"
          ></mfe-search-search>
          <mfe-search-plus
            (click)="currentJob.set(null);form.openJobModal()"
          ></mfe-search-plus>
        </div>
      }
    </h1>
    @if(isSearchingActive()){
      <mfe-search-search-box (onchange)="onSearch($event)"></mfe-search-search-box>
    }
    <div class="mfe-search-mx-auto mfe-search-relative mfe-search-aspect-[16/4] mfe-search-gap-4 mfe-search-flex mfe-search-flex-wrap">
      @for (job of jobs(); track $index) {
        <mfe-search-job 
        [jobView]="job" 
        (onEdit)="currentJob.set(job);form.openJobModal()"
        (onDelete)="deleteJob(job.id)"
        [isCurrentsearch]="isCurrentsearch()">
        </mfe-search-job>
      }@empty {
        <div class="mfe-search-w-full mfe-search-flex mfe-search-justify-center mfe-search-text-center mfe-search-py-8 mfe-search-text-gray-500">
          <p>No Jobs details available.</p>
        </div>
      }
    </div>
  </mfe-search-section>

  @if(isCurrentsearch()) {
    <mfe-search-form-job
      [initialData]="currentJob()"
      (onSubmit)="updateJob($event)"
    ></mfe-search-form-job>
  }
  `,
  imports: [SectionComponent, JobComponent, PlusComponent, FormJobComponent, SearchBoxComponent, SearchComponent]
})
export class JobsShellComponent implements OnInit {

  private jobsStore = inject(JobsStore);
  private route = inject(ActivatedRoute);
  isCurrentsearch = input<boolean>(false);

  @ViewChild(FormJobComponent) form!: FormJobComponent;
  currentJob = signal<Job | null>(null);
  isSearchingActive = signal<boolean>(false);

  jobs = this.jobsStore.jobs;

  constructor() { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username')!;
      this.jobsStore.loadJobs(username);
    });
  }

  toggleIsSearchingActive() {
    this.isSearchingActive.set(!this.isSearchingActive());
  }

  updateJob(job: Job) {
    this.jobsStore.update(job);
    this.form.onModalClosed();
  }

  deleteJob(jobId: string) {
    this.jobsStore.delete(jobId);
  }

  onSearch(query: string) {
    this.jobsStore.search(query);
  }
}
