// search-all.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';

import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchSidebarComponent } from '../ui/search-sidebar.component';
import { SearchResultsComponent } from '../ui/search-results.component';
import { SearchAllStore } from '../data-access/search-all.store';

@Component({
    selector: 'mfe-search-all',
    imports: [SectionComponent, SearchSidebarComponent, SearchResultsComponent],
    template: `
    <mfe-search-section ngxClass="md:mfe-search-pt-[5rem]">
        <div class="mfe-search-w-full mfe-search-mx-auto mfe-search-px-2 mfe-search-py-6 mfe-search-grid max-sm:mfe-search-grid-cols-1 mfe-search-grid-cols-4 mfe-search-gap-6">
            <mfe-search-sidebar
                [sections]="[
                    {
                    title: { value: 'main', label: 'En esta página' },
                    items: [
                        { value: 'people', label: 'Personas' },
                        { value: 'company', label: 'Compañías' }
                    ]
                    },
                ]"
                (filterChange)="onFilterChange($event)" />

            <mfe-search-results class=""
                [activeTab]="activeTab().section"
                [companies]="searchAllStore.companies()"
                [peoples]="searchAllStore.peoples()" />
            
        </div>
    </mfe-search-section>
    `
})
export class SearchAllComponent implements OnInit {
    private debounceTimer: ReturnType<typeof setTimeout> | null = null;
    activeTab = signal<{ section: string; selected: string[] }>(
        {
            section: 'people',
            selected: []
        }
    );

    searchAllStore = inject(SearchAllStore);

    ngOnInit(): void {
        window.addEventListener('mfe-search:domains:all', this.listener);
    }

    listener = (event: Event) => {
        const { detail } = event as CustomEvent;
        const safe = detail.replace(/<[^>]*>/g, '').trim();

        if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
            this.search(safe);
        }, 300);
    };

    onFilterChange(filter: { section: string; selected: string[] }){
        this.activeTab.set(filter)
    }

    search(input: string){
        if (this.activeTab().section == 'people'){
            this.searchAllStore.loadPeoplesByUserInput({
                input: input,
                filters: this.activeTab().selected
            });
        } else if(this.activeTab().section == 'company'){
            this.searchAllStore.loadCompaniesByUserInput({
                input: input,
                filters: this.activeTab().selected
            });
        }
    }
}

/**
 *  {
        title: { value: 'people', label: 'Filtrar por' },
        items: [
            { value: 'username', label: 'Usuario' },
            { value: 'name', label: 'Nombre' },
            { value: 'headline', label: 'Cabecera' },
            { value: 'address', label: 'direccion' },
            { value: 'about', label: 'sobre' }
        ]
        },
        {
        title: { value: 'company', label: 'Filtrar por' },
        items: [
            { value: '1', label: 'Google' },
            { value: '2', label: 'Meta' },
            { value: '3', label: 'OpenAI' }
        ]
    }
 */