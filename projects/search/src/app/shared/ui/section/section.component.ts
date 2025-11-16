import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'mfe-search-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  imports: [NgClass]
})
export class SectionComponent {
  ngxClass = input<string>()
}
