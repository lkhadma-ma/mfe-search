import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';
import { People } from '../data-access/people';
import { NotFoundComponent } from "./not-found.component";
import { LoadingComponent } from "./loading.component";

@Component({
    selector: 'mfe-search-people-results',
    imports: [CommonModule, PersonCardComponent, NotFoundComponent, LoadingComponent],
    template: `
            <h2 class="mfe-search-results-title">People</h2>

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

    `,
    styleUrls: ['./people-results.component.scss'],
})
export class PeopleResultsComponent {
    peoples = input<People[]>([])
    loading = input<boolean>(false);

    hasResults = computed(() => !this.loading() && this.peoples().length > 0);
    isEmpty = computed(() => !this.loading() && this.peoples().length === 0);

}