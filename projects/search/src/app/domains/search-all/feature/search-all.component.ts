// search-all.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchSidebarComponent } from '../ui/search-sidebar.component';
import { SearchResultsComponent } from '../ui/search-results.component';
import { SearchAllStore } from '../data-access/search-all.store';

@Component({
    selector: 'mfe-search-all',
    imports: [CommonModule, SectionComponent, SearchSidebarComponent, SearchResultsComponent],
    template: `
    <mfe-search-section ngxClass="md:mfe-user-pt-[5rem]">
        <div class="mfe-search-grids">
            <mfe-search-sidebar
                [sections]="[
                    {
                    title: { value: 'main', label: 'En esta página' },
                    items: [
                        { value: 'people', label: 'Personas' },
                        { value: 'company', label: 'Compañías' }
                    ]
                    },
                    {
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
                ]"
                (filterChange)="onFilterChange($event)" />

            <mfe-search-results class=""
                [activeTab]="activeTab().section"
                [companies]="searchAllStore.companies()"
                [peoples]="searchAllStore.peoples()"
                [loading]="searchAllStore.loading()"  />
            
        </div>
    </mfe-search-section>
    `,
    styleUrls: ['./search-all.component.scss'],
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