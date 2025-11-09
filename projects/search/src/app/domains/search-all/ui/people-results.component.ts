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
                    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_100_100/B4DZSaPw.bGcAU-/0/1737754612249?e=1764201600&v=beta&t=_GI_MC7vrn2S48Zpx76xqBiAwKhOJ9mazFT_DDEnrsU',
                    name: 'Oussama Yaagoub',
                    headline: 'Software Developer',
                    location: 'Vicenza'
                }" />

    `,
    styleUrls: ['./people-results.component.scss'],
})
export class PeopleResultsComponent {}