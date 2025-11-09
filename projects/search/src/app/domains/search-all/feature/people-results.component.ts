// people-results.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from './person-card.component';

@Component({
    selector: 'mfe-search-people-results',
    imports: [CommonModule, PersonCardComponent],
    template: `
            <h2 class="mfe-search-results-title">People</h2>
            
            <mfe-search-person-card 
                [person]="{
                    initials: 'ET',
                    name: 'Emassiri Tasnim',
                    connection: '3rd+',
                    location: 'Vicenza'
                }" />
            
            <!-- See all people results -->
            <div class="mfe-search-see-all">
                <button class="mfe-search-see-all-btn">See all people results</button>
            </div>

    `,
    styleUrls: ['./people-results.component.scss'],
})
export class PeopleResultsComponent {}