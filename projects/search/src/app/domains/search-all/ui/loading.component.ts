import { Component } from '@angular/core';

@Component({
  selector: 'mfe-search-loading',
  template: `
    @for (item of [1,2,3,4]; track $index) {
        <div class="loading">
            <div class="animation">
                <div class="avatar"></div>
                <div class="content">
                <div class="line" [style.--w]="'50%'"></div>
                <div class="line" [style.--w]="'70%'"></div>
                <div class="line" [style.--w]="'90%'"></div>
                </div>
            </div>
        </div>
    }
    
  `,
  styles: `
    :host {
      @apply mfe-search-w-full mfe-search-flex mfe-search-flex-col ;
    }

    .loading {
      @apply mfe-search-mx-auto mfe-search-w-full mfe-search-rounded-md mfe-search-p-4;
    }

    .animation {
      @apply mfe-search-flex mfe-search-animate-pulse mfe-search-space-x-4 mfe-search-items-center;
    }

    .avatar {
      @apply mfe-search-size-20 mfe-search-rounded-full mfe-search-bg-gray-200;
    }

    .content {
      @apply mfe-search-flex-1 mfe-search-space-y-4 mfe-search-py-1;
    }

    .line {
      @apply mfe-search-h-2 mfe-search-rounded mfe-search-bg-gray-200;

      width: var(--w, 100%);
    }
  `,
})
export class LoadingComponent {

}
