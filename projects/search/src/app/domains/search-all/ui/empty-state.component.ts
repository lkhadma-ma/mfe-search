import { Component, input } from '@angular/core';

@Component({
    selector: 'mfe-search-empty-state',
    host: {
        class: 'mfe-search-text-center mfe-search-py-8'
    },
    template: `
        <div class="mfe-search-flex mfe-search-justify-center mfe-search-mb-4">
            <svg class="mfe-search-w-12 mfe-search-h-12 mfe-search-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 class="mfe-search-text-lg mfe-search-font-medium mfe-search-text-gray-900 mfe-search-mb-2">{{ title() }}</h3>
        <p class="mfe-search-text-gray-500">{{ message() }}</p>
    `
})
export class EmptyStateComponent {
    title = input('Ready to explore!');
    message = input('Start searching to discover amazing companies');
}