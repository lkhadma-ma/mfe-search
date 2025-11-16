import { Component } from '@angular/core';

@Component({
  selector: 'mfe-search-search',
  host: { class: 'mfe-search-cursor-pointer hover:mfe-search-scale-105' },
  template: `
  <i class="fa-solid fa-magnifying-glass"></i>`
})
export class SearchComponent {
}
