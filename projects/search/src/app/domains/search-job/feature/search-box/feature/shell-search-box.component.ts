import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mfe-search-job-section',
  imports: [FormsModule],
  host: {
    class: 'mfe-search-w-full'
  },
  template: `
    <div class="mfe-search-w-full sm:mfe-search-px-6 lg:mfe-search-px-8">
      <div class="mfe-search-w-full mfe-search-relative mfe-search-overflow-hidden
             mfe-search-px-6 mfe-search-py-20 mfe-search-text-center
             sm:mfe-search-px-16">
        <p class="mfe-search-mx-auto mfe-search-max-w-2xl mfe-search-text-3xl
             mfe-search-font-bold mfe-search-tracking-tight mfe-search-text-gray-900
             sm:mfe-search-text-4xl lg:mfe-search-text-7xl">
          Didn't find job you were looking for?
        </p>

        <form #form="ngForm" (submit)="form.valid && onSubmit.emit(form.value)">
          <label class="mfe-search-mx-auto mfe-search-mt-8 mfe-search-relative mfe-search-bg-white
              mfe-search-max-w-5xl mfe-search-flex mfe-search-flex-col
             md:mfe-search-flex-row mfe-search-items-center mfe-search-justify-center
             mfe-search-border mfe-search-py-2 mfe-search-px-2 mfe-search-rounded-2xl
             mfe-search-gap-2 mfe-search-shadow-2xl focus-within:mfe-search-border-gray-300" for="search-bar">

            <input
              id="search-bar"
              placeholder="your keyword here"
              ngModel
              name="search"
              class="mfe-search-px-6 mfe-search-py-2 mfe-search-w-full mfe-search-rounded-md
             mfe-search-flex-1 mfe-search-outline-none mfe-search-bg-white"
              required
            />

            <button type="submit" class="mfe-search-w-full md:mfe-search-w-auto mfe-search-px-6 mfe-search-py-3
             mfe-search-bg-black mfe-search-border-black mfe-search-text-white
             mfe-search-fill-white active:mfe-search-scale-95 mfe-search-duration-100
             mfe-search-border mfe-search-will-change-transform mfe-search-overflow-hidden
             mfe-search-relative mfe-search-rounded-xl mfe-search-transition-all">
              <div class="mfe-search-flex mfe-search-items-center mfe-search-transition-all">
                <span class="mfe-search-text-sm mfe-search-font-semibold mfe-search-whitespace-nowrap mfe-search-truncate mfe-search-mx-auto">Search</span>
              </div>
            </button>

          </label>
        </form>

      </div>
    </div>
  `
})
export class SearchJobSectionComponent {
    onSubmit = output<string>();
}
