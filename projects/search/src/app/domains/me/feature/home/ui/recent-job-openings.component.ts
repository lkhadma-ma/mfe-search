import { Component, input, output } from '@angular/core';
import { SectionComponent } from "./section.component";
import { Job } from '../data-access/job';

@Component({
    selector: 'mfe-search-recent-job-openings',
    template: `
    <mfe-search-section>
        <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-5 mfe-user-flex mfe-user-justify-between">
            Recent Job Openings
        </h1>
        <p class="mfe-search-text-gray-700 mfe-search-text-base">
            @let jobIn = job();
            @if (jobIn) {
                <div class="mfe-search-w-full mfe-search-flex">
                    <img [src]="jobIn.search.avatar" alt="avatar" class="mfe-search-w-14 mfe-search-h-14 mfe-search-rounded-md mfe-search-object-cover mfe-search-mr-4"/>
                    <div class="mfe-search-flex mfe-search-flex-col">
                        <h2 class="mfe-search-text-md mfe-search-font-bold mfe-search-mt-1">{{jobIn.position}}</h2>
                        <p class="mfe-search-text-sm mfe-search-text-gray-700 mfe-search-mb-4">{{jobIn.location}}</p>
                    </div>
                </div>
            }@else {
                No recent job openings available.
            }
        </p>
        <div (click)="onChangeTab.emit()" class="mfe-search-mt-4 mfe-search-w-full mfe-search-justify-center mfe-search-flex mfe-search-items-center mfe-search-border-t mfe-search-pt-4 mfe-search-cursor-pointer">
            <div class="mfe-search-space-x-1 mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-gap-2 mfe-search-font-medium mfe-search-hover:underline">
            <span>Show more Jobs</span><i class="fa-solid fa-right-long mfe-search-text-[10px] mfe-search-relative -mfe-search-bottom-[2px]"></i>
            </div>
        </div>
    </mfe-search-section>
    `,
    imports: [SectionComponent]
})

export class RecentJobOpeningsComponent {
    job = input<Job>();
    onChangeTab = output<void>();
}