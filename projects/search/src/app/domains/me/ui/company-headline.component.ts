import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-search-headline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="mfe-search-text-xs sm:mfe-search-text-base">
    <ng-content></ng-content>
    
    </p>
  ` 
})
export class searchHeadlineComponent {}
