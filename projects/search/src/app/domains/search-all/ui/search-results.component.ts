import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleResultsComponent } from './people-results.component';
import { CompanyResultsComponent } from "./company-results.component";
import { People } from '../data-access/people';
import { Comapny } from '../data-access/company';

@Component({
    selector: 'mfe-search-results',
    imports: [CommonModule, PeopleResultsComponent, CompanyResultsComponent],
    template: `
            @if (activeTab() === 'people') {
                <mfe-search-people-results [peoples]="peoples()"  />
            }
            @if (activeTab() === 'company') {
                <mfe-search-comapny-results [companies]="companies()" />
            }
            
    `,
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
    activeTab = input<string>('');

    peoples = input<People[]>([]);
    companies = input<Comapny[]>([]);
}