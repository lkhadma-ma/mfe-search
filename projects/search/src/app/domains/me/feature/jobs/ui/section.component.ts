import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mfe-search-section',
    host: { class: 'mfe-search-w-full' },
    template: `
    <div class="mfe-search-border mfe-search-rounded-xl mfe-search-bg-white">
    <div class="mfe-search-relative mfe-search-aspect-[16/4] mfe-search-p-4 mfe-search-space-y-4">
      <ng-content></ng-content>
    </div>
  </div>
    `
})

export class SectionComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}