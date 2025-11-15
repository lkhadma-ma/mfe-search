import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { People } from '../data-access/people';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'mfe-search-person-card',
    imports: [CommonModule, RouterLink],
    template: `
        <div class="mfe-search-person-card" [routerLink]="['/lk',people.username]">
            <div class="mfe-search-person-header">
                <div class="mfe-search-avatar">
                    <img class="mfe-search-avatar-initials" [src]="people.avatar" alt="">    
                </div>
                <div class="mfe-search-person-info">
                    <h3 class="mfe-search-person-name">{{ people.name }}</h3>
                    <p *ngIf="people.headline" class="mfe-search-person-connection">{{ people.headline }}</p>
                    <p *ngIf="people.address" class="mfe-search-person-location">{{ people.address }}</p>
                </div>
            </div>
            <button class="mfe-search-message-btn">Message</button>
        </div>
    `,
    styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent {
    @Input() people!: People;
}