import { Component } from '@angular/core';

@Component({
    standalone:true,
    selector: 'mfe-search-not-found',
    template: `
    <div 
        class="mfe-search-not-found"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="mfe-search-no-options">No result found</p>
        <p class="mfe-search-try-adjusting">Try adjusting your search</p>
      </div>
    
    `,
    styles: `
        .mfe-search-not-found {
            @apply mfe-search-w-full mfe-search-h-1/2 mfe-search-px-4 mfe-search-py-8 mfe-search-text-center mfe-search-text-gray-500 mfe-search-text-sm;

            svg {
                @apply mfe-search-w-12 mfe-search-h-12 mfe-search-mx-auto mfe-search-mb-2 mfe-search-text-gray-300;
            }
            .mfe-search-no-options {
                @apply mfe-search-font-medium;
            }
            .mfe-search-try-adjusting {
                @apply mfe-search-text-xs mfe-search-mt-1;
            }
        }
    
    `
})

export class NotFoundComponent {

}