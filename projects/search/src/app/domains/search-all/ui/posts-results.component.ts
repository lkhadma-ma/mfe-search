// posts-results.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { PromoCardComponent } from './promo-card.component';

@Component({
    selector: 'mfe-search-posts-results',
    imports: [CommonModule, PostCardComponent, PromoCardComponent],
    template: `
            <h2 class="mfe-search-results-title">Posts</h2>
            
            <!-- Posts filters -->
            <div class="mfe-search-posts-filters">
                <div class="mfe-search-filter-group-horizontal">
                    <button class="mfe-search-filter-btn mfe-search-filter-active">From my network</button>
                    <button class="mfe-search-filter-btn">Past 24 hours</button>
                    <button class="mfe-search-filter-btn">Past week</button>
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
    `,
    styleUrls: ['./posts-results.component.scss'],
})
export class PostsResultsComponent {}