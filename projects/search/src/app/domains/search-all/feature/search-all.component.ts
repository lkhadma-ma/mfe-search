// search-all.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchSidebarComponent } from './search-sidebar.component';
import { SearchResultsComponent } from './search-results.component';

@Component({
    selector: 'mfe-search-search-all',
    imports: [CommonModule, SectionComponent, SearchSidebarComponent, SearchResultsComponent],
    template: `
    <mfe-search-section ngxClass="md:mfe-user-pt-[5rem]">
        <div class="mfe-search-grids">
            <mfe-search-sidebar />
            <mfe-search-results />
        </div>
    </mfe-search-section>
    `,
    styleUrls: ['./search-all.component.scss'],
})
export class SearchAllComponent implements OnInit {
    listener = (event: Event) => {
        const { detail } = event as CustomEvent;
        const safe = detail.replace(/<[^>]*>/g, '').trim();
    };

    ngOnInit(): void {
        window.addEventListener('mfe-search:domains:all', this.listener);
    }
}