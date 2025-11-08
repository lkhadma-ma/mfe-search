import { Component, Input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormHeaderComponent } from "./form-header.component";
import { searchHeadlineComponent } from "./search-headline.component";
import { searchHeader } from '../data-access/search';

@Component({
  selector: 'mfe-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, searchHeadlineComponent],
  host: {
    class: 'mfe-search-w-full',
  },
  template: `
    <div class="mfe-search-border mfe-search-rounded-xl mfe-search-bg-white">
      <!-- Header background -->
      <div class="mfe-search-relative mfe-search-aspect-[16/4]">
        <img loading="lazy"
          class="mfe-search-w-full mfe-search-bg-cover mfe-search-bg-center mfe-search-max-h-[201px] mfe-search-border-t-4 mfe-search-rounded-t-md mfe-search-border-[#F8C77D]"
          [src]="search.bg"
          alt="bg"
        />
        <p
          class="mfe-search-absolute mfe-search-text-xs mfe-search-font-medium mfe-search-tracking-widest mfe-search-text-gray-300 mfe-search-uppercase mfe-search-left-1 mfe-search-top-2"
        >
          premium
        </p>

        <!-- Edit background -->
        <span
          *ngIf="isCurrentsearch"
          (click)="loadImageFromDrive('bg')"
          class="mfe-search-cursor-pointer mfe-search-absolute mfe-search-top-0 mfe-search-right-[0.5rem] hover:mfe-search-scale-105 mfe-search-w-10 mfe-search-h-10 mfe-search-rounded-full mfe-search-bg-white mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-shadow-md mfe-search-mt-3 mfe-search-ml-3"
        >
          <i class="fa-solid fa-pencil"></i>
        </span>

      
      </div>

      <!-- Avatar -->
      <div
        class="mfe-search-relative mfe-search-flex mfe-search-items-center mfe-search-justify-center max-sm:-mfe-search-mt-[2.5rem] -mfe-search-mt-[6rem] mfe-search-ml-[2rem] max-sm:mfe-search-w-[5rem] max-sm:mfe-search-h-[5rem] mfe-search-h-[150px] mfe-search-w-[150px] mfe-search-rounded-full mfe-search-bg-white"
      >
        <!-- Edit avatar -->
        <span
            *ngIf="isCurrentsearch"
            (click)="loadImageFromDrive('avatar')"
            class="mfe-search-z-[12] mfe-search-cursor-pointer mfe-search-absolute mfe-search-top-0 mfe-search-right-[-0.5rem] hover:mfe-search-scale-105 mfe-search-w-10 mfe-search-h-10 mfe-search-rounded-full mfe-search-bg-white mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-shadow-md mfe-search-mt-3 mfe-search-mr-3"
          >
            <i class="fa-solid fa-pencil"></i>
        </span>
        <img
          class="mfe-search-z-10 mfe-search-w-full mfe-search-h-full mfe-search-border-white mfe-search-border-4 mfe-search-rounded-full"
          [src]="search.avatar"
          alt="Me"
          loading="lazy"
        />
      </div>

      <!-- Name + Headline + Skills -->
      <div class="mfe-search-flex mfe-search-flex-col mfe-search-px-4 mfe-search-py-3 mfe-search-relative">
        <span
            *ngIf="isCurrentsearch"
            (click)="from()?.openHeaderModal()"
            class="mfe-search-z-10 mfe-search-cursor-pointer mfe-search-absolute mfe-search-top-[-4rem] mfe-search-right-[-.25rem] hover:mfe-search-scale-105 mfe-search-w-10 mfe-search-h-10 mfe-search-rounded-full mfe-search-bg-white mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-shadow-md mfe-search-mt-3 mfe-search-mr-3"
          >
            <i class="fa-solid fa-pencil"></i>
        </span>
          <h1
            class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-2xl"
          >
            {{ search.name }}
          </h1>

        <!-- Headline -->
          <mfe-search-headline>
            {{ search.headline }}
          </mfe-search-headline>
      </div>
    </div>
    @if (isCurrentsearch) {
      <mfe-search-form-header
        (onSubmit)="updateHeader($event)" 
        [initialData]="{
          name: search.name,
          headline: search.headline
        }"
      >
      </mfe-search-form-header>
    }
  `,
})
export class HeaderComponent {
  from = viewChild(FormHeaderComponent);
  update = output<{
    name?: string;
    headline?: string;
    avatar?:File;
    bg?:File;
    action:string;
  }>();
  @Input() isCurrentsearch: boolean = false;
  @Input() search!: searchHeader;

  updateHeader(data: { name: string; headline: string }) {
    const dataWithAction = { ...data, action: 'name&headline' };
    this.update.emit(dataWithAction);
  }

  updateBg(imageBase64: { bg: File }) {
    const dataWithAction = { ...imageBase64, action: 'bg' };
    this.update.emit(dataWithAction);
  }

  updateAvatar(data: { avatar: File }) {
    const dataWithAction = { ...data, action: 'avatar' };
    this.update.emit(dataWithAction);
  }

  loadImageFromDrive(type: 'avatar' | 'bg') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (type === 'avatar') {
          this.updateAvatar({ avatar: file });
        } else {
          this.updateBg({ bg: file });
        }
      }
    };
  }
}
