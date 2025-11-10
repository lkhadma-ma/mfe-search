import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';
import { People } from '../data-access/people';

@Component({
    selector: 'mfe-search-people-results',
    imports: [CommonModule, PersonCardComponent],
    template: `
            <h2 class="mfe-search-results-title">People</h2>

            @for (people of peoples(); track $index) {
                <mfe-search-person-card 
                    [people]="people" />
            }

    `,
    styleUrls: ['./people-results.component.scss'],
})
export class PeopleResultsComponent {
    peoples = input<People[]>([])
}