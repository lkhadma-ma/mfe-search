import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'job-search-header',
  standalone: true,
  template: `
    <div class="mfe-search-p-4 mfe-search-border-b mfe-search-border-gray-200">
      <div class="mfe-search-mb-4">
        <input 
          type="text" 
          placeholder="Search jobs..." 
          class="mfe-search-w-full mfe-search-px-4 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-lg mfe-search-focus:mfe-search-outline-none mfe-search-focus:mfe-search-ring-2 mfe-search-focus:mfe-search-ring-blue-500 mfe-search-focus:mfe-search-border-blue-500"
          [value]="searchTerm()"
          (input)="onTermChange($event)"
          (keyup.enter)="onSearch()">
      </div>

      <div class="mfe-search-flex mfe-search-gap-2">
        <button 
          (click)="onSearch()"
          [disabled]="isSearching()"
          class="mfe-search-flex-1 mfe-search-px-4 mfe-search-py-2 mfe-search-bg-blue-500 mfe-search-text-white mfe-search-rounded-lg mfe-search-text-sm hover:mfe-search-bg-blue-600 mfe-search-transition-colors disabled:mfe-search-opacity-50 disabled:mfe-search-cursor-not-allowed">
          {{ isSearching() ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </div>
  `
})
export class JobSearchHeaderComponent {
  readonly searchTerm = input('');
  readonly isSearching = input(false);

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() searchRequested = new EventEmitter<string>();
  @Output() startSearch = new EventEmitter<void>();

  onTermChange(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.searchTermChange.emit(v);
  }

  onSearch() {
    this.startSearch.emit();
    this.searchRequested.emit(this.searchTerm());
  }
}
