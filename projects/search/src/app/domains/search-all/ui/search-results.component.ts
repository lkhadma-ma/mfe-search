import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleResultsComponent } from './people-results.component';
import { CompanyResultsComponent } from "./company-results.component";
import { People } from '../data-access/people';
import { Comapny } from '../data-access/company';

@Component({
    selector: 'mfe-search-results',
    host: {
        class: 'sm:mfe-search-col-span-3 mfe-search-space-y-4'
    },
    imports: [CommonModule, PeopleResultsComponent, CompanyResultsComponent],
    template: `
        @if (activeTab() === 'people') {
            <mfe-search-people-results [peoples]="peoples()"  />
        }
        @if (activeTab() === 'company') {
            <mfe-search-comapny-results [loading]="loading()" [companies]="companies()" />
        }
            
    `
})
export class SearchResultsComponent {
    activeTab = input<string>('');
    loading = input<boolean>(false);

    peoples = input<People[] | undefined | null>(null);
    companies = input<Comapny[]>([]);
}