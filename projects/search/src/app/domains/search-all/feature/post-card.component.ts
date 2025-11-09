// post-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Post {
    authorInitials: string;
    authorName: string;
    connection?: string;
    bio?: string;
    content?: string;
}

@Component({
    selector: 'mfe-search-post-card',
    imports: [CommonModule],
    template: `
        <div class="mfe-search-post-card">
            <div class="mfe-search-post-header">
                <div class="mfe-search-avatar-small">
                    <div class="mfe-search-avatar-initials">{{ post.authorInitials }}</div>
                </div>
                <div class="mfe-search-post-author">
                    <h4 class="mfe-search-post-name">{{ post.authorName }}</h4>
                    <p *ngIf="post.connection" class="mfe-search-post-connection">{{ post.connection }}</p>
                    <p *ngIf="post.bio" class="mfe-search-post-bio">{{ post.bio }}</p>
                </div>
                <button class="mfe-search-follow-btn">Follow</button>
            </div>
            <div *ngIf="post.content" class="mfe-search-post-content">
                <p class="mfe-search-post-text">{{ post.content }}</p>
            </div>
        </div>
    `,
    styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
    @Input() post!: Post;
}