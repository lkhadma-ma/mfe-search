import { Component, EventEmitter, Output, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FilterItem {
  value: string;
  label: string;
}

interface FilterSection {
  title: FilterItem; // title now has value + label
  items: FilterItem[];
}

@Component({
  selector: 'mfe-search-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- MAIN SECTION: always visible -->
    <div class="mfe-search-section">
      <h3 class="mfe-search-section-title">{{ mainSection.title.label }}</h3>

      <div
        *ngFor="let item of mainSection.items"
        class="mfe-search-nav-item"
        [class.mfe-search-active]="mainActive() === item.value"
        (click)="selectMain(item.value)"
      >
        {{ item.label }}
      </div>
    </div>

    <!-- SUB SECTIONS: only display the selected one -->
    <div *ngFor="let section of filteredSections()" class="mfe-search-section">
      <h3 class="mfe-search-section-title">{{ section.title.label }}</h3>

      <div
        *ngFor="let item of section.items"
        class="mfe-search-nav-item"
        [class.mfe-search-active]="isActive(section.title.value, item.value)"
        (click)="toggleItem(section.title.value, item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  `,
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent {
  /**
   * Input example:
   * [
   *   {
   *     title: { value: 'main', label: 'En esta página' },
   *     items: [
   *       { value: 'people', label: 'Personas' },
   *       { value: 'company', label: 'Compañías' }
   *     ]
   *   },
   *   {
   *     title: { value: 'people', label: 'Personas' },
   *     items: [
   *       { value: '1', label: 'Juan' },
   *       { value: '2', label: 'Ana' },
   *       { value: '3', label: 'Luis' }
   *     ]
   *   },
   *   {
   *     title: { value: 'company', label: 'Compañías' },
   *     items: [
   *       { value: '1', label: 'Google' },
   *       { value: '2', label: 'Meta' },
   *       { value: '3', label: 'OpenAI' }
   *     ]
   *   }
   * ]
   */
  sections = input<FilterSection[]>([]);

  @Output() filterChange = new EventEmitter<{ section: string; selected: string[] }>();

  /** Selected main filter (people/company) */
  mainActive = signal<string>('people');

  /** Selected items per section (multiple allowed) */
  activeSub = signal<Record<string, string[]>>({});

  /** Get the main section (first one) */
  get mainSection(): FilterSection {
    return this.sections()[0] ?? {
      title: { value: 'main', label: 'On this page' },
      items: [],
    };
  }

  /** Filter sections: only show the selected one */
  filteredSections = computed(() =>
    this.sections().filter(s => s.title.value === this.mainActive())
  );

  /** Select main category (people / company) */
  selectMain(value: string) {
    this.mainActive.set(value);
    this.filterChange.emit({ section: value, selected: [] });
  }

  /** Toggle sub-items (multi + deselect) */
  toggleItem(sectionValue: string, itemValue: string) {
    const current = this.activeSub()[sectionValue] ?? [];
    const exists = current.includes(itemValue);
    const updated = exists
      ? current.filter(v => v !== itemValue)
      : [...current, itemValue];

    this.activeSub.set({
      ...this.activeSub(),
      [sectionValue]: updated,
    });

    this.filterChange.emit({ section: sectionValue, selected: updated });
  }

  /** Check if item is active */
  isActive(sectionValue: string, itemValue: string): boolean {
    return this.activeSub()[sectionValue]?.includes(itemValue) ?? false;
  }
}
