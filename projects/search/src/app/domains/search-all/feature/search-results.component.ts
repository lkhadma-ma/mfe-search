// search-results.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleResultsComponent } from './people-results.component';
import { PostsResultsComponent } from './posts-results.component';

@Component({
    selector: 'mfe-search-results',
    imports: [CommonModule, PeopleResultsComponent, PostsResultsComponent],
    template: `
            <mfe-search-people-results />
            <mfe-search-posts-results />
    `,
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {}