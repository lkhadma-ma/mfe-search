import { Component, input } from '@angular/core';

@Component({
    selector: 'mfe-search-about',
    template:`
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>{{about()?.overview}}</p>
    </div>
    <h3 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-md mfe-search-mt-4 mfe-search-flex mfe-search-justify-between">
        Website
    </h3>
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>
            <a class="mfe-search-text-blue-600 mfe-search-underline mfe-search-cursor-pointer" href="{{about()?.website}}" target="_blank" rel="noopener noreferrer">
            {{about()?.website}}
            </a>
        </p>
    </div>
    <h3 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-md mfe-search-mt-4 mfe-search-flex mfe-search-justify-between">
        Industry
    </h3>
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>{{about()?.industry}}</p>
    </div>
    <h3 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-md mfe-search-mt-4 mfe-search-flex mfe-search-justify-between">
        search Size
    </h3>
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>{{about()?.searchSize}} Employees</p>
    </div>
    <h3 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-md mfe-search-mt-4 mfe-search-flex mfe-search-justify-between">
        Founded
    </h3>
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>{{about()?.founded}}</p>
    </div>
    <h3 class="mfe-search-font-semibold mfe-search-tracking-wide sm:mfe-search-text-md mfe-search-mt-4 mfe-search-flex mfe-search-justify-between">
        Specialties
    </h3>
    <div class="mfe-search-w-full mfe-search-text-gray-500 mfe-search-text-md mfe-search-leading-7">
        <p>{{about()?.specialties}}</p>
    </div>
    `
})

export class AboutComponent {

    about = input<{
        overview: string;
        website: string;
        industry: string;
        searchSize: string;
        founded: string;
        specialties: string;
    }>();
    
}