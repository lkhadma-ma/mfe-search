import {
  Component,
  ContentChildren,
  QueryList,
  input,
  signal,
  effect,
  TemplateRef,
  AfterContentInit,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-search-tap',
  standalone: true,
  template: ``
})
export class TapComponent {
  label = input<string>('');
  isActive = signal(false);
}

@Component({
  selector: 'mfe-search-content',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class ContentComponent {
  label = input<string>('');
  template = input<TemplateRef<unknown>>();
}

@Component({
  selector: 'mfe-search-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="mfe-search-border mfe-search-rounded-lg mfe-search-bg-white">
  <div class="mfe-search-px-4 mfe-search-pt-4 mfe-search-space-y-2">
    <div class="mfe-search-border-b mfe-search-border-gray-200">
      <nav class="mfe-search-flex mfe-search-space-x-8 mfe-search-overflow-x-auto mfe-search-no-scrollbar">
        <button
          *ngFor="let tab of tabs"
          (click)="selectTab(tab.label())"
          [class]="getTabClass(tab.label())">
          {{ tab.label() }}
        </button>
      </nav>
    </div>
  </div>
</div>

<div class="mfe-search-space-y-2">
  <div class="mfe-search-mt-4">
    <ng-container *ngFor="let content of contents">
      <ng-container *ngIf="activeTab() === content.label() && content.template()">
        <ng-container *ngTemplateOutlet="content.template()"></ng-container>
      </ng-container>
    </ng-container>
  </div>
</div>
  `
})
export class TabsComponent implements AfterContentInit {
  activeTab = input<string>('');
  onChange = output<string>();

  @ContentChildren(TapComponent) tabs!: QueryList<TapComponent>;
  @ContentChildren(ContentComponent) contents!: QueryList<ContentComponent>;

  constructor() {
    effect(() => {
      const current = this.activeTab();
      this.tabs?.forEach(t => t.isActive.set(t.label() === current));
    });
  }

  ngAfterContentInit() {
    const initial = this.activeTab() || this.tabs.first?.label() || '';
    this.onChange.emit(initial);
  }

  selectTab(tab: string): void {
    this.onChange.emit(tab);
  }

  getTabClass(tab: string): string {
    const base =
      'mfe-search-py-2 mfe-search-px-1 mfe-search-font-medium mfe-search-text-sm mfe-search-whitespace-nowrap mfe-search-focus:outline-none';
    return this.activeTab() === tab
      ? `${base} mfe-search-border-b-2 mfe-search-border-blue-500 mfe-search-text-blue-600`
      : `${base} mfe-search-border-b-2 mfe-search-border-transparent mfe-search-text-gray-500 hover:mfe-search-text-gray-700 hover:mfe-search-border-gray-300`;
  }
}
