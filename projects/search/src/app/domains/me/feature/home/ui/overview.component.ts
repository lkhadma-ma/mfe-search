import { Component, OnInit, input, output } from '@angular/core';
import { SectionComponent } from "./section.component";

@Component({
    selector: 'mfe-search-overview',
    host: { class: 'mfe-search-w-full' },
    template: `
    <mfe-search-section>
        <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-5 mfe-user-flex mfe-user-justify-between">
        Overview
        </h1>
        <p class="mfe-search-text-gray-700 mfe-search-text-base">
            {{ overview() }}
        </p>
        <div (click)="onChangeTab.emit()" class="mfe-search-mt-4 mfe-search-w-full mfe-search-justify-center mfe-search-flex mfe-search-items-center mfe-search-border-t mfe-search-pt-4 mfe-search-cursor-pointer">
            <div class="mfe-search-space-x-1 mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-gap-2 mfe-search-font-medium mfe-search-hover:underline">
            <span>Show more details</span><i class="fa-solid fa-right-long mfe-search-text-[10px] mfe-search-relative -mfe-search-bottom-[2px]"></i>
            </div>
        </div>
    </mfe-search-section>
    `,
    imports: [SectionComponent]
})

export class OverviewComponent {
    overview = input<string>('');
    onChangeTab = output<void>();
}