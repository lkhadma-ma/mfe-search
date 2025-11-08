import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mfe-search-search-box',
  host: { class: 'mfe-search-relative mfe-search-mb-2' },
  imports: [FormsModule],
  template: `
    <form class="mfe-search-pt-2 mfe-search-relative mfe-search-mx-auto mfe-search-text-gray-600">
      <input
        ngModel
        name="search"
        type="search"
        placeholder="Search"
        (ngModelChange)="onChange($event)"
        class="mfe-search-border-2 mfe-search-border-gray-300 mfe-search-bg-white mfe-search-h-10 mfe-search-px-5 mfe-search-rounded-lg mfe-search-text-sm focus:mfe-search-outline-none mfe-search-w-1/2"
      />
    </form>
  `
})
export class SearchBoxComponent {
  onchange = output<string>();

  onChange(value: string) {
    this.onchange.emit(value);
  }
}
