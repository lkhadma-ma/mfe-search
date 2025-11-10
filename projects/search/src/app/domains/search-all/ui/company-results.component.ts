import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comapny } from '../data-access/company';
import { ComapnyCardComponent } from "./company-card.component";

@Component({
    selector: 'mfe-search-comapny-results',
    imports: [CommonModule, ComapnyCardComponent],
    template: `
            <h2 class="mfe-search-results-title">Company</h2>

            @for (company of companies(); track $index) {
                <mfe-search-company-card 
                    [company]="company" />
            }

    `,
    styleUrls: ['./company-results.component.scss'],
})
export class CompanyResultsComponent {
    companies = input<Comapny[]>([])
}