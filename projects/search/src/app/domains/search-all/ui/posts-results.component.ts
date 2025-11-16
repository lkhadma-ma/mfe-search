import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { PromoCardComponent } from './promo-card.component';

@Component({
    selector: 'mfe-search-posts-results',
    host: {
        class: 'mfe-search-block mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-6'
    },
    imports: [CommonModule, PostCardComponent, PromoCardComponent],
    template: `
            <h2 class="mfe-search-text-xl mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-4">Posts</h2>
            
            <!-- Posts filters -->
            <div class="mfe-search-mb-4">
                <div class="mfe-search-flex mfe-search-space-x-2">
                    <button class="mfe-search-px-3 mfe-search-py-1 mfe-search-text-sm mfe-search-border  mfe-search-rounded-full hover:mfe-search-bg-gray-50 mfe-search-bg-blue-50 mfe-search-text-blue-600 mfe-search-border-blue-200">From my network</button>
                    <button class="mfe-search-px-3 mfe-search-py-1 mfe-search-text-sm mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-full hover:mfe-search-bg-gray-50 mfe-search-text-gray-600">Past 24 hours</button>
                    <button class="mfe-search-px-3 mfe-search-py-1 mfe-search-text-sm mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-full hover:mfe-search-bg-gray-50 mfe-search-text-gray-600">Past week</button>
                </div>
            </div>

            <mfe-search-post-card 
                [post]="{
                    authorInitials: 'SN',
                    authorName: 'Samin Nasr-Azadani',
                    connection: '3rd+',
                    bio: 'Satellite Navigation & Positioning Researcher | Exploring GNSS...',
                    content: 'إن كه مقاله من عليرغم حولك تخصصي يودنش در كتار بسيار زونيا يومني توافقًا لكل كبيرة رام بسيار با نزول و هوشملك كندده يوم. محترفاً...'
                }" />
            
            <mfe-search-post-card 
                [post]="{
                    authorInitials: 'PZ',
                    authorName: 'Perhman Zamani',
                    bio: 'Business Development | Contracts & Claim | Procurement & Comm...'
                }" />
            
            <mfe-search-promo-card />
    `
})
export class PostsResultsComponent {}