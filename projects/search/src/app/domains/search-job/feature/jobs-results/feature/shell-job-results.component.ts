import { Component, OnInit, computed, input, output, signal } from '@angular/core';
import { CompanySize, EmploymentType, Job, LocationType } from '../../../data-access/job';
import { JobListComponent } from '../ui/job-list.component';
import { JobDetailsComponent } from '../ui/job-details.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'mfe-search-job-results-section',
  standalone: true,
  imports: [JobListComponent, JobDetailsComponent, NgStyle],
  host: {
    class: 'mfe-search-w-full'
  },
  template: `

  @if(isDesktop()){
    <div class="mfe-search-flex mfe-search-min-h-[85vh] mfe-search-max-h-[85vh] mfe-search-bg-white mfe-search-rounded-2xl mfe-search-p-3">
    <!-- Left Column - Job List (30%) -->
      <div class="mfe-search-w-full sm:mfe-search-w-1/3 mfe-search-border-gray-200 mfe-search-flex mfe-search-flex-col mfe-search-min-h-[-webkit-fill-available]">
        <job-list class="mfe-search-min-h-[-webkit-fill-available] mfe-search-contents"
          [jobs]="jobs()"
          [selectedJobId]="selectedJobId()"
          [appliedJobs]="appliedJobs()"
          (selectJob)="selectJob($event)"
        ></job-list>
      </div>

      <!-- Right Column - Job Details (70%) -->
      <div class="mfe-search-w-full sm:mfe-search-w-2/3 mfe-search-border-l mfe-search-flex mfe-search-flex-col mfe-search-overflow-y-auto mfe-search-no-scrollbar mfe-search-min-h-[-webkit-fill-available]">
        <job-details
          [job]="selectedJob()"
          [isSaved]="isJobSaved(selectedJobId() || 0)()"
          [isApplied]="isJobApplied(selectedJobId() || 0)()"
          (easyApply)="onEasyApply($event)"
          (saveJob)="onSaveJob($event)"
        ></job-details>
      </div>
    
    </div>
  } @else {
    <div class="mfe-search-flex max-sm:mfe-search-flex-col mfe-search-bg-white">
    <!-- Left Column  -->
      <div class="mfe-search-w-full mfe-search-border-gray-200 mfe-search-flex mfe-search-flex-col mfe-search-min-h-[-webkit-fill-available]">
        <job-list class="mfe-search-min-h-[-webkit-fill-available] mfe-search-contents"
          [jobs]="jobs()"
          [selectedJobId]="selectedJobId()"
          [appliedJobs]="appliedJobs()"
          (selectJob)="openSheet($event)"
        ></job-list>
      </div>

    <!-- Right Column -->
      <div
        class="mfe-search-fixed mfe-search-bottom-0 mfe-search-left-0 mfe-search-w-full mfe-search-bg-white mfe-search-border-t mfe-search-rounded-t-2xl mfe-search-shadow-lg mfe-search-flex mfe-search-flex-col mfe-search-overflow-y-auto mfe-search-no-scrollbar mfe-search-transition-all mfe-search-duration-300 mfe-search-ease-in-out"
        [ngStyle]="{'height': sheetHeight() + 'vh', 'visibility': sheetHeight() > 0 ? 'visible' : 'hidden'}"
        (touchstart)="startTouch($event)"
        (touchmove)="moveTouch($event)"
        (touchend)="endTouch()"
      >
        <job-details class="mfe-search-pb-[50px]"
          [job]="selectedJob()"
          [isSaved]="isJobSaved(selectedJobId() || 0)()"
          [isApplied]="isJobApplied(selectedJobId() || 0)()"
          (easyApply)="onEasyApply($event)"
          (saveJob)="onSaveJob($event)"
        ></job-details>
      </div>
    
    </div>
  }
  `
})
export class SearchJobResultsComponent implements OnInit {
  // inputs to allow parent override
  jobs = input<Job[] | undefined>(undefined);

  selectedJobId = signal<number | null>(null);
  savedJobs = signal<Set<number>>(new Set());
  appliedJobs = signal<Set<number>>(new Set());

  isDesktop = signal<boolean>(window.innerWidth >= 640);
  private mediaQuery!: MediaQueryList;
  sheetHeight = signal(0);

  selectedJob = computed(() => {
    const id = this.selectedJobId();
    if (!id) return null;
    return this.jobs()?.find(j => j.id === id) || null;
  });

  ngOnInit() {
    this.mediaQuery = window.matchMedia('(min-width: 640px)');
    this.isDesktop.set(this.mediaQuery.matches);

    this.mediaQuery.addEventListener('change', (e) => {
      this.isDesktop.set(e.matches);
    });
  }

  selectJob(id: number) {
    this.selectedJobId.set(id);
  }

  onEasyApply(job: Job) {
    if (!job.id) return;
    this.appliedJobs.update(s => {
      const set = new Set(s);
      if (set.has(job.id!)) set.delete(job.id!);
      else set.add(job.id!);
      return set;
    });
  }

  onSaveJob(job: Job) {
    if (!job.id) return;
    this.savedJobs.update(s => {
      const set = new Set(s);
      if (set.has(job.id!)) set.delete(job.id!);
      else set.add(job.id!);
      return set;
    });
  }

  isJobSaved = (jobId: number) => computed(() => this.savedJobs().has(jobId));
  isJobApplied = (jobId: number) => computed(() => this.appliedJobs().has(jobId));

  openSheet(id: number) {
    this.selectJob(id);
    this.sheetHeight.set(90);
  }

  closeSheet() {
    this.sheetHeight.set(0);
  }

  private startY = 0;
  private currentY = 0;
  private dragging = false;
  private isDraggingSheet = false;

  private touchStartTime = 0;


  startTouch(event: TouchEvent) {
    const touchY = event.touches[0].clientY;
  
    // Sheet is closed → do nothing
    if (this.sheetHeight() === 0) return;
  
    const sheetTop = window.innerHeight - (window.innerHeight * (this.sheetHeight() / 100));
  
    // Only start drag if touch begins in top 40px of sheet
    if (touchY < sheetTop + 40) {
      this.isDraggingSheet = true;
      this.dragging = true;
      this.startY = touchY;
      this.touchStartTime = performance.now();
      event.preventDefault(); // stop page scroll
    } else {
      this.isDraggingSheet = false; // let page scroll normally
    }
  }
  
  

  moveTouch(event: TouchEvent) {
    if (!this.dragging || !this.isDraggingSheet) return;
  
    const currentY = event.touches[0].clientY;
    const diff = currentY - this.startY;
  
    if (diff > 0) {
      // Move sheet downward
      this.sheetHeight.set(Math.max(20, 90 - (diff / window.innerHeight) * 100));
    }
  
    this.currentY = currentY;
    event.preventDefault(); // stops page from scrolling while dragging sheet
  }
  
  

  endTouch() {
    if (!this.isDraggingSheet) return;
  
    this.dragging = false;
    this.isDraggingSheet = false;
  
    const endTime = performance.now();
    const duration = endTime - this.touchStartTime;
    const distance = this.currentY - this.startY;
    const velocity = distance / duration;
  
    const FAST_SWIPE_VELOCITY = 0.6;
  
    if (velocity > FAST_SWIPE_VELOCITY && distance > 40) {
      this.closeSheet();
      return;
    }
  
    if (this.sheetHeight() < 50) this.closeSheet();
    else this.sheetHeight.set(90);
  }
  
  
}
