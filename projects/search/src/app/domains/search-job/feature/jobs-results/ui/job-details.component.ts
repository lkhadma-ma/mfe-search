import { Component, computed, inject, input, output } from '@angular/core';
import { Job } from '../../../data-access/job';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { MarkdownPipe } from '@shared/pipes/markdown.pipe';
import { JobResultsStore } from '../data-access/job-results.store';


@Component({
  selector: 'job-details',
  imports: [RouterLink, TimeAgoPipe, MarkdownPipe],
  standalone: true,
  template: `
    @let jobView = job();
    @if (jobView) {
      <!-- Header -->
      <div class="mfe-search-p-6 mfe-search-border-b mfe-search-border-gray-200">
        <div class="mfe-search-flex mfe-search-justify-between mfe-search-items-start mfe-search-mb-4">
          <div>
            <h1 class="mfe-search-text-xl max-sm:mfe-search-max-w-[90%] sm:mfe-search-text-2xl mfe-search-font-bold mfe-search-text-gray-900 mfe-search-mb-2">
              {{ jobView.position }}
            </h1>
            <div class="mfe-search-flex mfe-search-flex-wrap sm:mfe-search-flex-row mfe-search-items-center mfe-search-gap-2 sm:mfe-search-gap-4 mfe-search-text-sm mfe-search-text-gray-600">
              <span class="mfe-search-font-medium sm:mfe-search-min-w-max">{{ jobView.company.name }}</span>
              <span class="max-sm:mfe-search-hidden">•</span>
              <span class="sm:mfe-search-min-w-max">{{ jobView.location }}</span>
              <span class="max-sm:mfe-search-hidden">•</span>
              <span class="mfe-search-text-green-600 mfe-search-font-medium sm:mfe-search-min-w-max">{{ jobView.locationType }}</span>
            </div>
          </div>
          @if (jobView.company.avatar) {
            <img
              [src]="jobView.company.avatar"
              [alt]="jobView.company.name"
              class="mfe-search-w-16 mfe-search-h-16 mfe-search-rounded-lg mfe-search-object-cover" />
          }
        </div>
        <!-- Action Buttons -->
        <div class="mfe-search-flex mfe-search-gap-3 mfe-search-flex-wrap">
          <button
            (click)="onEasyApply()"
            [class]="isApplied() ? 'mfe-search-px-6 mfe-search-py-2 mfe-search-bg-green-100 mfe-search-text-green-800 mfe-search-rounded-lg mfe-search-font-medium mfe-search-border mfe-search-border-green-300 hover:mfe-search-bg-green-200 mfe-search-transition-colors' : 'mfe-search-px-6 mfe-search-py-2 mfe-search-bg-green-500 mfe-search-text-white mfe-search-rounded-lg mfe-search-font-medium hover:mfe-search-bg-green-600 mfe-search-transition-colors'">
            {{ isApplied() ? 'Applied ✓' : 'Easy Apply' }}
          </button>
          <button class="mfe-search-px-6 mfe-search-py-2 mfe-search-bg-white mfe-search-text-gray-700 mfe-search-rounded-lg mfe-search-font-medium mfe-search-border mfe-search-border-gray-300 hover:mfe-search-bg-gray-50 mfe-search-transition-colors">
            Share
          </button>
        </div>
      </div>
      <!-- Content -->
      <div class="mfe-search-flex-1 mfe-search-overflow-y-auto mfe-search-p-6">
        <!-- Job Status -->
        <div class="max-sm:mfe-search-text-[12px] mfe-search-bg-green-50 mfe-search-border mfe-search-border-green-200 mfe-search-rounded-lg max-sm:mfe-search-px-2 max-sm:mfe-search-py-3 mfe-search-p-4 mfe-search-mb-6">
          <div class="mfe-search-flex mfe-search-items-center mfe-search-gap-2">
            <span class="mfe-search-text-green-600 mfe-search-min-w-max">Created {{ jobView.createdAt | timeAgo }}</span>
            <span class="mfe-search-text-green-500">•</span>
            <span class="mfe-search-text-green-600 mfe-search-min-w-max">Updated {{ jobView.updatedAt | timeAgo }}</span>
          </div>
        </div>

        <!-- Skills Match -->
        @if (jobView.skills && jobView.skills.length > 0) {
          <div class="mfe-search-bg-blue-50 mfe-search-border mfe-search-border-blue-200 mfe-search-rounded-lg mfe-search-p-4 mfe-search-mb-6">
            <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-2">Skills requirements</h3>
            <div class="mfe-search-flex mfe-search-flex-wrap mfe-search-gap-2">
              @for (skill of jobView.skills; track skill) {
                <span class="mfe-search-bg-blue-100 mfe-search-text-blue-800 mfe-search-px-3 mfe-search-py-1 mfe-search-rounded-full mfe-search-text-sm mfe-search-font-medium">
                  {{ skill.label }}
                </span>
              }
            </div>
          </div>
        }
        <!-- Job Description -->
        <div class="mfe-search-mb-6">
          <h3 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">About the job</h3>
          <div class="mfe-search-prose mfe-search-text-gray-700 mfe-search-leading-relaxed">
            <p class="prose" [innerHTML]="jobView.description | markdown"></p>
          </div>
        </div>
        <!-- Company Info -->
        @if (jobView.company) {
          <div class="mfe-search-border-t mfe-search-border-gray-200 mfe-search-pt-6">
            <h3 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">About the company</h3>
            <div class="mfe-search-flex mfe-search-items-start mfe-search-gap-4">
              @if (jobView.company.avatar) {
                <img [src]="jobView.company.avatar" [alt]="jobView.company.name" class="mfe-search-w-16 mfe-search-h-16 mfe-search-rounded-lg mfe-search-object-cover" />
              }
              <div>
                <a [routerLink]="['/lk',jobView.company.username]" class="mfe-search-text-lg mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-cursor-pointer">{{ jobView.company.name }}</a>
                @if (jobView.company.about.companySize) {
                  <p class="mfe-search-text-gray-600 mfe-search-mt-1">Company size: {{ jobView.company.about.companySize }}</p>
                }
                @if (jobView.company.about.overview) {
                  <p class="mfe-search-text-gray-700 mfe-search-mt-2">{{ jobView.company.about.overview }}</p>
                }
              </div>
            </div>
          </div>
        }
        <!-- Hiring Team -->
        <div class="mfe-search-border-t mfe-search-border-gray-200 mfe-search-pt-6 mfe-search-mt-6">
          <h3 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">Hiring team</h3>
          <div class="mfe-search-bg-gray-50 mfe-search-rounded-lg mfe-search-p-4">
            <div class="mfe-search-flex mfe-search-justify-between mfe-search-items-center">
              <div>
                <h4 class="mfe-search-font-semibold mfe-search-text-gray-900">Lidia Mor Alcalde</h4>
                <p class="mfe-search-text-gray-600 mfe-search-text-sm">People & Talent Consultant</p>
                <p class="mfe-search-text-gray-500 mfe-search-text-xs mfe-search-mt-1">28 mutual connections</p>
              </div>
              <button class="mfe-search-px-4 mfe-search-py-2 mfe-search-bg-blue-600 mfe-search-text-white mfe-search-rounded-lg hover:mfe-search-bg-blue-700 mfe-search-transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="mfe-search-flex-1 mfe-search-h-full mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-text-gray-500">
        <div class="mfe-search-text-center">
          <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-mb-2">Select a job to view details</h3>
          <p>Choose a job from the list to see the complete information</p>
        </div>
      </div>
    }
    
    `
})
export class JobDetailsComponent {

  job = input<Job | null>();
  jobResultsStore = inject(JobResultsStore);

  isApplied = computed(() => {
      const job = this.job();
      if (!job?.id) return false;
      return this.jobResultsStore.isApplied(job.id);
  });

  onEasyApply = () => {
      const job = this.job();
      if (!job?.id) return;
      this.jobResultsStore.applyJob(job.id);
  };

}
