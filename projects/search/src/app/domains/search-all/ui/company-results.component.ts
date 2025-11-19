import { Component, computed, input } from '@angular/core';

import { Comapny } from '../data-access/company';
import { ComapnyCardComponent } from "./company-card.component";
import { NotFoundComponent } from './not-found.component';
import { LoadingComponent } from "./loading.component";

@Component({
    selector: 'mfe-search-comapny-results',
    host: {
        class: 'mfe-search-block mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-6'
    },
    imports: [ComapnyCardComponent, NotFoundComponent, LoadingComponent],
    template: `
            <h2 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">Company</h2>

            <!-- Loading -->
            @if (loading()) {
                <mfe-search-loading />
            }

            <!-- Results -->
            @else if (hasResults()) {
                @for (company of companies(); track $index) {
                <mfe-search-company-card 
                    [company]="company" />
            }
            }

            <!-- Empty -->
            @else if (isEmpty()) {
                <mfe-search-not-found />
            }

    `
})
export class CompanyResultsComponent {
    companies = input<Comapny[]>([])
    loading = input<boolean>(false);

    hasResults = computed(() => !this.loading() && this.companies().length > 0);
    isEmpty = computed(() => !this.loading() && this.companies().length === 0);
}