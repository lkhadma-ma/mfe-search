// search-sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-search-sidebar',
    imports: [CommonModule],
    template: `
            <!-- On this page section -->
            <div class="mfe-search-section">
                <h3 class="mfe-search-section-title">On this page</h3>
                <div class="mfe-search-nav-item mfe-search-active">People</div>
                <div class="mfe-search-nav-item">Company</div>
            </div>


            <!-- People filters -->
            <div class="mfe-search-section">
                <h3 class="mfe-search-section-title">People</h3>
                <div class="mfe-search-filter-group">
                    <div class="mfe-search-filter-item mfe-search-active">
                        <span class="mfe-search-filter-text">1st</span>
                    </div>
                    <div class="mfe-search-filter-item">
                        <span class="mfe-search-filter-text">2nd</span>
                    </div>
                    <div class="mfe-search-filter-item">
                        <span class="mfe-search-filter-text">3rd+</span>
                    </div>
                    <div class="mfe-search-filter-item">
                        <span class="mfe-search-filter-text">Actively hiring</span>
                    </div>
                </div>
            </div>
    `,
    styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent {}