import { Component, computed, input, output, signal } from '@angular/core';
import { CompanySize, EmploymentType, JobDto, LocationType, SkillCategory } from '../../../ui/job.dto';
import { JobSearchHeaderComponent } from '../../../ui/job-search-header.component';
import { JobListComponent } from '../../../ui/job-list.component';
import { JobDetailsComponent } from '../../../ui/job-details.component';

@Component({
  selector: 'mfe-search-job-results-section',
  standalone: true,
  imports: [JobSearchHeaderComponent, JobListComponent, JobDetailsComponent],
  host: {
    class: 'mfe-search-w-full'
  },
  template: `
  <div class="mfe-search-flex mfe-search-h-full mfe-search-bg-white mfe-search-rounded-2xl mfe-search-p-3">
    <!-- Left Column - Job List (30%) -->
    <div class="mfe-search-w-1/3 mfe-search-border-r mfe-search-border-gray-200 mfe-search-flex mfe-search-flex-col mfe-search-h-full">
      <job-search-header
        [searchTerm]="searchTerm()"
        [isSearching]="isSearching()"
        (searchTermChange)="searchTerm.set($event)"
        (searchRequested)="searchRequested.emit($event)"
        (startSearch)="startSearch()"
      ></job-search-header>

      <job-list
        [jobs]="filteredJobs()"
        [selectedJobId]="selectedJobId()"
        [appliedJobs]="appliedJobs()"
        [isSearching]="isSearching()"
        (selectJob)="selectJob($event)"
      ></job-list>
    </div>

    <!-- Right Column - Job Details (70%) -->
    <div class="mfe-search-w-2/3  mfe-search-flex mfe-search-flex-col mfe-search-h-full">
      <job-details
        [job]="selectedJob()"
        [isSaved]="isJobSaved(selectedJobId() || 0)()"
        [isApplied]="isJobApplied(selectedJobId() || 0)()"
        (easyApply)="onEasyApply($event)"
        (saveJob)="onSaveJob($event)"
      ></job-details>
    </div>
  </div>
  `
})
export class SearchJobResultsSectionComponent {
  // inputs to allow parent override
  jobs = input<JobDto[]>([
    {
      id: 1,
      position: 'Senior Angular Developer',
      location: 'Spain (Remote)',
      locationType: LocationType.REMOTE,
      description: 'Build and maintain Angular applications...',
      employmentType: EmploymentType.FULL_TIME,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        id: 10,
        website:'',
        name: 'Tech Innovators',
        avatar: 'https://placehold.co/100x100',
        size: CompanySize.MEDIUM,
        description: 'A company focused on innovative web platforms.'
      },
      skills: [
        { id: 1, name: 'Angular', category: SkillCategory.FRONTEND },
        { id: 2, name: 'TypeScript', category: SkillCategory.FRONTEND },
        { id: 3, name: 'RxJS', category: SkillCategory.FRONTEND }
      ]
    },
    {
      id: 2,
      position: 'Backend Node.js Engineer',
      location: 'Germany (Hybrid)',
      locationType: LocationType.HYBRID,
      description: 'Work on high-performance backend systems...',
      employmentType: EmploymentType.CONTRACT,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        website:'',
        description: '',
        id: 11,
        name: 'Cloud Systems EU',
        avatar: 'https://placehold.co/100x100',
        size: CompanySize.LARGE
      },
      skills: [
        { id: 4, name: 'Node.js', category: SkillCategory.BACKEND },
        { id: 5, name: 'PostgreSQL', category: SkillCategory.DATABASE },
        { id: 6, name: 'Docker', category: SkillCategory.DEVOPS }
      ]
    },
    {
      id: 3,
      position: 'Mobile Flutter Developer',
      location: 'USA (On-site)',
      locationType: LocationType.ON_SITE,
      description: 'Create cross-platform mobile apps using Flutter...',
      employmentType: EmploymentType.FULL_TIME,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        website:'',
        description: '',
        id: 12,
        name: 'Appify Labs',
        avatar: 'https://placehold.co/100x100',
        size: CompanySize.SMALL
      },
      skills: [
        { id: 7, name: 'Flutter', category: SkillCategory.MOBILE },
        { id: 8, name: 'Dart', category: SkillCategory.MOBILE }
      ]
    }
  ]);
  totalResults = input<number>(0);
  userHasPremium = input<boolean>(false);

  // output
  searchRequested = output<string>();

  // signals
  searchTerm = signal<string>('');
  selectedJobId = signal<number | null>(null);
  savedJobs = signal<Set<number>>(new Set());
  appliedJobs = signal<Set<number>>(new Set());
  isSearching = signal<boolean>(false);

  // computed
  filteredJobs = computed(() => {
    // simple filter on searchTerm if provided
    const term = this.searchTerm().trim().toLowerCase();
    const jobs = this.jobs();
    if (!term) return jobs;
    return jobs.filter(j =>
      (j.position || '').toLowerCase().includes(term) ||
      (j.company?.name || '').toLowerCase().includes(term) ||
      (j.location || '').toLowerCase().includes(term)
    );
  });

  selectedJob = computed(() => {
    const id = this.selectedJobId();
    if (!id) return null;
    return this.jobs().find(j => j.id === id) || null;
  });

  startSearch() {
    // caller will have emitted searchRequested; here we manage isSearching UX
    this.isSearching.set(true);
    // simulate finish — in real app, parent will provide results and set signal
    setTimeout(() => this.isSearching.set(false), 800);
  }

  selectJob(id: number) {
    this.selectedJobId.set(id);
  }

  onEasyApply(job: JobDto) {
    if (!job.id) return;
    this.appliedJobs.update(s => {
      const set = new Set(s);
      if (set.has(job.id!)) set.delete(job.id!);
      else set.add(job.id!);
      return set;
    });
  }

  onSaveJob(job: JobDto) {
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
}
