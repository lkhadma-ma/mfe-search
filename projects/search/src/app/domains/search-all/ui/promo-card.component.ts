// promo-card.component.ts
import { Component } from '@angular/core';


@Component({
    selector: 'mfe-search-promo-card',
    imports: [],
    template: `
        <div class="mfe-search-bg-gray-50 mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-4 mfe-search-flex mfe-search-items-center mfe-search-justify-between">
            <div class="mfe-search-flex-1">
                <h4 class="mfe-search-text-sm mfe-search-font-semibold mfe-search-text-gray-900">Oussama, explore relevant opportunities with em&e</h4>
                <p class="mfe-search-text-sm mfe-search-text-gray-600 mfe-search-mt-1">Get the latest jobs and industry news</p>
            </div>
            <button class="mfe-search-follow-btn">Follow</button>
        </div>
    `
})
export class PromoCardComponent {}