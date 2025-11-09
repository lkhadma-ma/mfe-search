import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleResultsComponent } from './people-results.component';
import { CompanyResultsComponent } from "./company-results.component";

@Component({
    selector: 'mfe-search-results',
    imports: [CommonModule, PeopleResultsComponent, CompanyResultsComponent],
    template: `
            @if (activeTab() === 'people') {
                <mfe-search-people-results />
            }
            @if (activeTab() === 'company') {
                <mfe-search-comapny-results />
            }
            
    `,
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
    activeTab = input<string>('');
}