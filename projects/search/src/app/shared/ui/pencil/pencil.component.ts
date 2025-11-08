import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfe-search-pencil',
  host: { class: 'mfe-search-z-10 mfe-search-cursor-pointer mfe-search-absolute mfe-search-top-[0rem] mfe-search-right-[-.25rem] hover:mfe-search-scale-105 mfe-search-w-10 mfe-search-h-10 mfe-search-rounded-full mfe-search-bg-white mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-shadow-md mfe-search-mt-3 mfe-search-mr-3' },
  template: `
  <i class="fa-solid fa-pencil"></i>
  `
})
export class PencilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
