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
  host: {
    class: 'mfe-search-w-full mfe-search-block sm:mfe-search-col-span-1 mfe-search-space-y-6 max-sm:mfe-search-rounded-lg max-sm:mfe-search-space-y-2 max-sm:mfe-search-bg-white max-sm:mfe-search-p-2'
  },
  template: `
    <!-- MAIN SECTION: always visible -->
    <div class="mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-4
     max-sm:mfe-search-bg-transparent max-sm:mfe-search-border-0 max-sm:mfe-search-p-0 max-sm:mfe-search-flex max-sm:mfe-search-flex-wrap
     max-sm:mfe-search-gap-2">
      <h3 class="mfe-search-text-sm mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-3 max-sm:mfe-search-hidden">{{ mainSection.title.label }}</h3>

      <div
        *ngFor="let item of mainSection.items"
        class="mfe-search-text-sm mfe-search-text-gray-600 mfe-search-py-1 mfe-search-px-2 mfe-search-cursor-pointer hover:mfe-search-bg-gray-50 mfe-search-rounded max-sm:mfe-search-rounded-3xl max-sm:mfe-search-bg-white max-sm:mfe-search-border max-sm:mfe-search-border-gray-200 max-sm:mfe-search-p-2 max-sm:mfe-search-px-4"
        [ngClass]="{
          'mfe-search-font-medium': mainActive() === item.value,
          'max-sm:hover:mfe-search-bg-green-900': mainActive() === item.value,
          'max-sm:mfe-search-text-white': mainActive() === item.value,
          'max-sm:mfe-search-bg-green-800': mainActive() === item.value
          }"
        (click)="selectMain(item.value)"
      >
        {{ item.label }}
      </div>
    </div>

    <!-- SUB SECTIONS: only display the selected one -->
    <div *ngFor="let section of filteredSections()" class="mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-p-4
     max-sm:mfe-search-bg-transparent max-sm:mfe-search-border-0 max-sm:mfe-search-p-0 max-sm:mfe-search-flex max-sm:mfe-search-flex-wrap
     max-sm:mfe-search-gap-2">
      <h3 class="mfe-search-text-sm mfe-search-font-semibold mfe-search-text-gray-900 mfe-search-mb-3 max-sm:mfe-search-hidden">{{ section.title.label }}</h3>

      <div
        *ngFor="let item of section.items"
        class="mfe-search-text-sm mfe-search-text-gray-600 mfe-search-py-1 mfe-search-px-2 mfe-search-cursor-pointer hover:mfe-search-bg-gray-50 mfe-search-rounded max-sm:mfe-search-rounded-3xl max-sm:mfe-search-bg-white max-sm:mfe-search-border max-sm:mfe-search-border-gray-200 max-sm:mfe-search-p-2 max-sm:mfe-search-px-4"
        [ngClass]="{
          'mfe-search-font-medium':isActive(section.title.value, item.value),
          'max-sm:hover:mfe-search-bg-green-900':isActive(section.title.value, item.value),
          'max-sm:mfe-search-text-white':isActive(section.title.value, item.value),
          'max-sm:mfe-search-bg-green-800': isActive(section.title.value, item.value)
          }"
        (click)="toggleItem(section.title.value, item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  `
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
