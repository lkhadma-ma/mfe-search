import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comapny } from '../data-access/company';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'mfe-search-company-card',
    imports: [CommonModule, RouterLink],
    template: `
        <div class="mfe-search-person-card" [routerLink]="['/lk',company.username]">
            <div class="mfe-search-person-header">
                <div class="mfe-search-avatar">
                    <img class="mfe-search-avatar-initials" [src]="company.avatar" alt="">    
                </div>
                <div class="mfe-search-person-info">
                    <h3 class="mfe-search-person-name">{{ company.name }}</h3>
                    <p *ngIf="company.headline" class="mfe-search-person-connection">{{ company.headline }}</p>
                    <p *ngIf="company.overview" class="mfe-search-person-location">{{ company.overview }}</p>
                </div>
            </div>
            <button class="mfe-search-message-btn">Message</button>
        </div>
    `,
    styleUrls: ['./person-card.component.scss'],
})
export class ComapnyCardComponent {
    @Input() company!: Comapny;
}