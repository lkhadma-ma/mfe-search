import { Component, Input } from '@angular/core';

import { Comapny } from '../data-access/company';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'mfe-search-company-card',
    imports: [RouterLink],
    template: `
        <div class="hover:mfe-search-bg-gray-50 mfe-search-cursor-pointer mfe-search-flex mfe-search-items-center mfe-search-justify-between mfe-search-py-4 mfe-search-px-2 mfe-search-border-b mfe-search-border-gray-100 last:mfe-search-border-b-0" [routerLink]="['/lk',company.username]">
          <div class="mfe-search-flex mfe-search-items-center mfe-search-space-x-3">
            <div class="mfe-search-w-16 mfe-search-h-16 mfe-search-rounded-full mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-overflow-hidden">
              <img class="mfe-search-text-white mfe-search-font-semibold mfe-search-text-sm" [src]="company.avatar" alt="">
            </div>
            <div class="mfe-search-flex-1">
              <h3 class="mfe-search-text-lg mfe-search-font-semibold mfe-search-text-gray-900">{{ company.name }}</h3>
              @if (company.headline) {
                <p class="mfe-search-text-sm mfe-search-text-gray-600">{{ company.headline }}</p>
              }
              @if (company.overview) {
                <p class="mfe-search-text-sm mfe-search-text-gray-500">{{ company.overview }}</p>
              }
            </div>
          </div>
          <button class="mfe-search-px-4 mfe-search-py-2 mfe-search-border mfe-search-border-gray-400 mfe-search-text-gray-700 mfe-search-rounded-full hover:mfe-search-bg-gray-50 mfe-search-text-sm mfe-search-font-medium mfe-search-hidden">Message</button>
        </div>
        `
})
export class ComapnyCardComponent {
    @Input() company!: Comapny;
}