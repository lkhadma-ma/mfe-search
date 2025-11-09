import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleResultsComponent } from './people-results.component';

@Component({
    selector: 'mfe-search-results',
    imports: [CommonModule, PeopleResultsComponent],
    template: `
            <mfe-search-people-results />
    `,
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {}