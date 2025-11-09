// person-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Person {
    initials: string;
    name: string;
    connection?: string;
    location?: string;
}

@Component({
    selector: 'mfe-search-person-card',
    imports: [CommonModule],
    template: `
        <div class="mfe-search-person-card">
            <div class="mfe-search-person-header">
                <div class="mfe-search-avatar">
                    <div class="mfe-search-avatar-initials">{{ person.initials }}</div>
                </div>
                <div class="mfe-search-person-info">
                    <h3 class="mfe-search-person-name">{{ person.name }}</h3>
                    <p *ngIf="person.connection" class="mfe-search-person-connection">{{ person.connection }}</p>
                    <p *ngIf="person.location" class="mfe-search-person-location">{{ person.location }}</p>
                </div>
            </div>
            <button class="mfe-search-message-btn">Message</button>
        </div>
    `,
    styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent {
    @Input() person!: Person;
}