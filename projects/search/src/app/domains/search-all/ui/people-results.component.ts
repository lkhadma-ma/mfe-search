import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';
import { People } from '../data-access/people';
import { NotFoundComponent } from "./not-found.component";
import { LoadingComponent } from "./loading.component";

@Component({
    selector: 'mfe-search-people-results',
    host: {
        class: 'mfe-search-block mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-6'
    },
    imports: [CommonModule, PersonCardComponent, NotFoundComponent, LoadingComponent],
    template: `
            <h2 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">People</h2>

            <!-- Loading -->
            @if (loading()) {
                <mfe-search-loading />
            }

            <!-- Results -->
            @else if (hasResults()) {
                @for (people of peoples(); track people) {
                    <mfe-search-person-card [people]="people" />
                }
            }

            <!-- Empty -->
            @else if (isEmpty()) {
                <mfe-search-not-found />
            }

    `
})
export class PeopleResultsComponent {
    peoples = input<People[]>([])
    loading = input<boolean>(false);

    hasResults = computed(() => !this.loading() && this.peoples().length > 0);
    isEmpty = computed(() => !this.loading() && this.peoples().length === 0);

}