import { Component, OnInit, ViewChild, inject, input } from '@angular/core';
import { SectionComponent } from "../ui/section.component";
import { AboutStore } from '../data-access/about.store';
import { AboutComponent } from "../ui/about.component";
import { FormAboutComponent } from "../ui/form-about.component";
import { About } from '../data-access/about';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mfe-search-about-shell',
  host: { class: 'mfe-search-w-full mfe-search-space-y-4' },
  template: `
    <mfe-search-section>
      <h1 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-xl mfe-search-mt-2 mfe-search-mb-4 mfe-search-flex mfe-search-justify-between">Overview
        @if(isCurrentsearch()) {
          <i class="fa-solid fa-pencil mfe-search-cursor-pointer hover:mfe-search-scale-105" (click)="form.openAboutModal()"></i>
        }
      </h1>

      @let aboutIn = about();
      @if(aboutIn){
        <mfe-search-about [about]="aboutIn"></mfe-search-about>
      }
  </mfe-search-section>

    
  @if(isCurrentsearch()) {
    <mfe-search-form-about
      [initialData]="about()"
      (onSubmit)="updateAbout($event)"
    ></mfe-search-form-about>
  }

  `,
  imports: [SectionComponent, AboutComponent, FormAboutComponent]
})
export class AboutShellComponent implements OnInit {

  isCurrentsearch = input<boolean>();
  private route = inject(ActivatedRoute);
  private aboutStore = inject(AboutStore);
  about = this.aboutStore.about;

  @ViewChild(FormAboutComponent) form!: FormAboutComponent;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username')!;
      this.aboutStore.loadAbout(username);
    });
  }

  updateAbout(data: About) {
    this.aboutStore.updateAbout(data);
  }
}
