import { Component, computed, input } from '@angular/core';

import { PersonCardComponent } from './person-card.component';
import { People } from '../data-access/people';
import { NotFoundComponent } from "./not-found.component";
import { LoadingComponent } from "./loading.component";
import { EmptyStateComponent } from "./empty-state.component";

@Component({
    selector: 'mfe-search-people-results',
    host: {
        class: 'mfe-search-block mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-6'
    },
    imports: [PersonCardComponent, NotFoundComponent, LoadingComponent, EmptyStateComponent],
    template: `
            <h2 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">People</h2>

            <!-- default view -->
            @if(peoples() === null){
                <mfe-search-empty-state 
                    title="Ready to search"
                    message="Enter a user name or keyword to begin your search" />
                
            }
            <!-- Loading -->
            @else if (peoples() === undefined) {
                <mfe-search-loading />
            }

            <!-- Results -->
            @else if (peoples()!.length > 0) {
                @for (people of peoples(); track people) {
                    <mfe-search-person-card [people]="people" />
                }
            }

            <!-- Empty -->
            @else {
                <mfe-search-not-found />
            }

    `
})
export class PeopleResultsComponent {
    peoples = input<People[] | undefined | null>(null);

}