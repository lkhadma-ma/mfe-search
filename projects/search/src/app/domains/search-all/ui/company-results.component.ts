import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comapny } from '../data-access/company';
import { ComapnyCardComponent } from "./company-card.component";
import { NotFoundComponent } from './not-found.component';
import { LoadingComponent } from "./loading.component";

@Component({
    selector: 'mfe-search-comapny-results',
    imports: [CommonModule, ComapnyCardComponent, NotFoundComponent, LoadingComponent],
    template: `
            <h2 class="mfe-search-results-title">Company</h2>

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

    `,
    styleUrls: ['./company-results.component.scss'],
})
export class CompanyResultsComponent {
    companies = input<Comapny[]>([])
    loading = input<boolean>(false);

    hasResults = computed(() => !this.loading() && this.companies().length > 0);
    isEmpty = computed(() => !this.loading() && this.companies().length === 0);
}