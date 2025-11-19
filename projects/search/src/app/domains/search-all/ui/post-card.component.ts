// post-card.component.ts
import { Component, Input } from '@angular/core';


export interface Post {
    authorInitials: string;
    authorName: string;
    connection?: string;
    bio?: string;
    content?: string;
}

@Component({
    selector: 'mfe-search-post-card',
    imports: [],
    template: `
        <div class="mfe-search-border-b mfe-search-border-gray-100 mfe-search-pb-6 mfe-search-mb-6 last:mfe-search-border-b-0 last:mfe-search-mb-0 last:mfe-search-pb-0">
          <div class="mfe-search-flex mfe-search-items-start mfe-search-justify-between mfe-search-mb-3">
            <div class="mfe-search-w-10 mfe-search-h-10 mfe-search-bg-gradient-to-r mfe-search-from-purple-500 mfe-search-to-purple-600 mfe-search-rounded-full mfe-search-flex mfe-search-items-center mfe-search-justify-center">
              <div class="mfe-search-text-white mfe-search-font-semibold mfe-search-text-sm">{{ post.authorInitials }}</div>
            </div>
            <div class="mfe-search-flex-1 mfe-search-mx-3">
              <h4 class="mfe-search-text-base mfe-search-font-semibold mfe-search-text-gray-900">{{ post.authorName }}</h4>
              @if (post.connection) {
                <p class="mfe-search-text-sm mfe-search-text-gray-600">{{ post.connection }}</p>
              }
              @if (post.bio) {
                <p class="mfe-search-text-sm mfe-search-text-gray-500 mfe-search-mt-1">{{ post.bio }}</p>
              }
            </div>
            <button class="mfe-search-px-4 mfe-search-py-1 mfe-search-bg-blue-600 mfe-search-text-white mfe-search-rounded-full hover:mfe-search-bg-blue-700 mfe-search-text-sm mfe-search-font-medium">Follow</button>
          </div>
          @if (post.content) {
            <div class="mfe-search-ml-12">
              <p class="mfe-search-text-gray-800 mfe-search-text-sm mfe-search-leading-relaxed">{{ post.content }}</p>
            </div>
          }
        </div>
        `
})
export class PostCardComponent {
    @Input() post!: Post;
}