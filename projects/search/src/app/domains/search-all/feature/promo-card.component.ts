// promo-card.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-search-promo-card',
    imports: [CommonModule],
    template: `
        <div class="mfe-search-promo-card">
            <div class="mfe-search-promo-header">
                <h4 class="mfe-search-promo-title">Oussama, explore relevant opportunities with em&e</h4>
                <p class="mfe-search-promo-subtitle">Get the latest jobs and industry news</p>
            </div>
            <button class="mfe-search-follow-btn">Follow</button>
        </div>
    `,
    styleUrls: ['./promo-card.component.scss'],
})
export class PromoCardComponent {}