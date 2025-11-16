import { Component } from '@angular/core';

@Component({
  selector: 'mfe-search-job-section',
  template: `
    <div class="mfe-search-container">
      <div class="mfe-search-wrapper">
        <p class="mfe-search-title">
          Didn't find component you were looking for?
        </p>

        <form action="/search">
          <label class="mfe-search-label" for="search-bar">

            <input
              id="search-bar"
              placeholder="your keyword here"
              name="q"
              class="mfe-search-input"
              required
            />

            <button type="submit" class="mfe-search-button">
              <div class="mfe-search-button-inner">
                <span class="mfe-search-button-text">Search</span>
              </div>
            </button>

          </label>
        </form>

      </div>
    </div>
  `,
  styles: `

    :host {
        @apply mfe-search-w-full;
    }
    .mfe-search-container {
      @apply mfe-search-w-full sm:mfe-search-px-6 lg:mfe-search-px-8;
    }

    .mfe-search-wrapper {
      @apply mfe-search-w-full mfe-search-relative mfe-search-overflow-hidden
             mfe-search-px-6 mfe-search-py-20 mfe-search-text-center
             sm:mfe-search-px-16;
    }

    .mfe-search-title {
      @apply mfe-search-mx-auto mfe-search-max-w-2xl mfe-search-text-3xl
             mfe-search-font-bold mfe-search-tracking-tight mfe-search-text-gray-900
             sm:mfe-search-text-4xl;
    }

    .mfe-search-label {
      @apply mfe-search-mx-auto mfe-search-mt-8 mfe-search-relative mfe-search-bg-white
              mfe-search-max-w-2xl mfe-search-flex mfe-search-flex-col
             md:mfe-search-flex-row mfe-search-items-center mfe-search-justify-center
             mfe-search-border mfe-search-py-2 mfe-search-px-2 mfe-search-rounded-2xl
             mfe-search-gap-2 mfe-search-shadow-2xl focus-within:mfe-search-border-gray-300;
    }

    .mfe-search-input {
      @apply mfe-search-px-6 mfe-search-py-2 mfe-search-w-full mfe-search-rounded-md
             mfe-search-flex-1 mfe-search-outline-none mfe-search-bg-white;
    }

    .mfe-search-button {
      @apply mfe-search-w-full md:mfe-search-w-auto mfe-search-px-6 mfe-search-py-3
             mfe-search-bg-black mfe-search-border-black mfe-search-text-white
             mfe-search-fill-white active:mfe-search-scale-95 mfe-search-duration-100
             mfe-search-border mfe-search-will-change-transform mfe-search-overflow-hidden
             mfe-search-relative mfe-search-rounded-xl mfe-search-transition-all;
    }

    .mfe-search-button-inner {
      @apply mfe-search-flex mfe-search-items-center mfe-search-transition-all;
    }

    .mfe-search-button-text {
      @apply mfe-search-text-sm mfe-search-font-semibold mfe-search-whitespace-nowrap
             mfe-search-truncate mfe-search-mx-auto;
    }

    .mfe-search-background {
      @apply mfe-search-absolute mfe-search-left-1/2 mfe-search-top-1/2 -mfe-search-z-10
             mfe-search-h-[64rem] mfe-search-w-[64rem] -mfe-search-translate-x-1/2
             [mask-image:radial-gradient(closest-side,white,transparent)];
    }
  `
})
export class SearchJobSectionComponent {}
