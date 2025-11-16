import { Component } from '@angular/core';

@Component({
  selector: 'mfe-search-loading',
  host: {
    class: 'mfe-search-w-full mfe-search-flex mfe-search-flex-col'
  },
  template: `
    @for (item of [1,2,3,4]; track $index) {
        <div class="mfe-search-mx-auto mfe-search-w-full mfe-search-rounded-md mfe-search-p-4">
            <div class="mfe-search-flex mfe-search-animate-pulse mfe-search-space-x-4 mfe-search-items-center">
                <div class="mfe-search-size-20 mfe-search-rounded-full mfe-search-bg-gray-200"></div>
                <div class="mfe-search-flex-1 mfe-search-space-y-4 mfe-search-py-1">
                <div class="mfe-search-w-[--w] mfe-search-h-2 mfe-search-rounded mfe-search-bg-gray-200" [style.--w]="'50%'"></div>
                <div class="mfe-search-w-[--w] mfe-search-h-2 mfe-search-rounded mfe-search-bg-gray-200" [style.--w]="'70%'"></div>
                <div class="mfe-search-w-[--w] mfe-search-h-2 mfe-search-rounded mfe-search-bg-gray-200" [style.--w]="'90%'"></div>
                </div>
            </div>
        </div>
    }
    
  `
})
export class LoadingComponent {

}
