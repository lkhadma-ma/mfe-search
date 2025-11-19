import { Component, forwardRef, OnInit, input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'mfe-search-multi-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="mfe-search-relative mfe-search-w-full">
      <!-- Selected Tags Display -->
      <div
        class="mfe-search-flex mfe-search-flex-wrap mfe-search-items-center mfe-search-gap-2 mfe-search-p-3 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-lg mfe-search-min-h-[44px] mfe-search-cursor-pointer mfe-search-bg-white mfe-search-transition-colors mfe-search-duration-200"
        [class.mfe-search-border-red-500]="isInvalid()"
        [class.mfe-search-border-blue-500]="isOpen"
        [class.mfe-search-ring-2]="isOpen"
        [class.mfe-search-ring-blue-200]="isOpen"
        (click)="toggleDropdown()"
        >
        <!-- Selected Tags -->
        @for (selectedOption of selectedOptions; track selectedOption; let i = $index) {
          <div
            class="mfe-search-bg-blue-50 mfe-search-text-blue-700 mfe-search-px-3 mfe-search-py-1.5 mfe-search-rounded-full mfe-search-text-sm mfe-search-flex mfe-search-items-center mfe-search-gap-2 mfe-search-border mfe-search-border-blue-200 mfe-search-transition-colors mfe-search-duration-150"
            >
            <span class="mfe-search-font-medium">{{ selectedOption.label }}</span>
            <button
              type="button"
              (click)="removeTag($event, i)"
              class="mfe-search-w-5 mfe-search-h-5 mfe-search-rounded-full mfe-search-bg-blue-100 hover:mfe-search-bg-blue-200 mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-text-blue-600 hover:mfe-search-text-blue-800 mfe-search-transition-colors mfe-search-duration-150 mfe-search-text-xs mfe-search-font-bold"
              >
              ×
            </button>
          </div>
        }
    
        <!-- Input for new tags -->
        @if (mode() === 'tags') {
          <input
            #tagInput
            type="text"
            [placeholder]="selectedOptions.length === 0 ? placeholder() : 'Add more...'"
            (keydown)="onTagInputKeydown($event)"
            (blur)="onTagInputBlur()"
            class="mfe-search-outline-none mfe-search-min-w-[120px] mfe-search-flex-1 mfe-search-bg-transparent mfe-search-text-gray-700 mfe-search-placeholder-gray-400"
            >
        }
    
        <!-- Placeholder when no selection -->
        @if (selectedOptions.length === 0 && mode() !== 'tags') {
          <div
            class="mfe-search-text-gray-500 mfe-search-text-sm mfe-search-italic"
            >
            {{ placeholder() }}
          </div>
        }
      </div>
    
      <!-- Dropdown Arrow -->
      <div class="mfe-search-absolute mfe-search-top-1/2 mfe-search-right-3 mfe-search-transform mfe-search--translate-y-1/2 mfe-search-pointer-events-none mfe-search-transition-transform mfe-search-duration-200"
        [class.mfe-search-rotate-180]="isOpen">
        <svg class="mfe-search-w-4 mfe-search-h-4 mfe-search-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    
      <!-- Dropdown Menu -->
      @if (isOpen) {
        <div
          class="mfe-search-absolute mfe-search-z-50 mfe-search-w-full mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-shadow-xl mfe-search-mt-2 mfe-search-max-h-60 mfe-search-overflow-y-auto mfe-search-animate-in mfe-search-fade-in mfe-search-slide-in-from-top-1"
          >
          <!-- Search Input -->
          @if (searchable()) {
            <div class="mfe-search-sticky mfe-search-top-0 mfe-search-bg-white mfe-search-p-3 mfe-search-border-b mfe-search-border-gray-100 mfe-search-z-10">
              <div class="mfe-search-relative">
                <svg class="mfe-search-absolute mfe-search-left-3 mfe-search-top-1/2 mfe-search-transform mfe-search--translate-y-1/2 mfe-search-w-4 mfe-search-h-4 mfe-search-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  #searchInput
                  type="text"
                  [placeholder]="searchPlaceholder()"
                  (input)="onSearchChange($event)"
                  class="mfe-search-w-full mfe-search-pl-10 mfe-search-pr-3 mfe-search-py-2.5 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-lg mfe-search-text-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500 mfe-search-bg-gray-50"
                  >
                </div>
              </div>
            }
            <!-- Options -->
            <div class="mfe-search-py-2">
              @for (option of filteredOptions; track option) {
                <div
                  (click)="toggleOption(option)"
                  [class.mfe-search-bg-blue-50]="isSelected(option)"
                  [class.mfe-search-text-blue-700]="isSelected(option)"
                  class="mfe-search-px-4 mfe-search-py-3 mfe-search-cursor-pointer mfe-search-text-sm mfe-search-transition-colors mfe-search-duration-150 hover:mfe-search-bg-gray-50 mfe-search-flex mfe-search-items-center mfe-search-justify-between mfe-search-border-l-2 mfe-search-border-transparent"
                  [class.mfe-search-border-l-blue-500]="isSelected(option)"
                  >
                  <span class="mfe-search-font-medium">{{ option.label }}</span>
                  @if (isSelected(option)) {
                    <span class="mfe-search-text-blue-600 mfe-search-font-bold">
                      <svg class="mfe-search-w-4 mfe-search-h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </span>
                  }
                </div>
              }
              <!-- No Results -->
              @if (filteredOptions.length === 0) {
                <div
                  class="mfe-search-px-4 mfe-search-py-8 mfe-search-text-center mfe-search-text-gray-500 mfe-search-text-sm"
                  >
                  <svg class="mfe-search-w-12 mfe-search-h-12 mfe-search-mx-auto mfe-search-mb-2 mfe-search-text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="mfe-search-font-medium">No options found</p>
                  <p class="mfe-search-text-xs mfe-search-mt-1">Try adjusting your search</p>
                </div>
              }
            </div>
          </div>
        }
      </div>
    `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
  readonly options = input<{
    value: any;
    label: string;
}[]>([]);
  readonly placeholder = input<string>('Select options...');
  readonly searchPlaceholder = input<string>('Search...');
  readonly mode = input<'multiple' | 'tags'>('multiple');
  readonly searchable = input<boolean>(true);
  readonly isInvalid = input<boolean>(false);

  selectedOptions: { value: any; label: string }[] = [];
  isOpen = false;
  searchTerm = '';
  filteredOptions: { value: any; label: string }[] = [];

  private onChange: (value: { value: any; label: string }[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.filteredOptions = [...this.options()];
  }

  // ControlValueAccessor methods
  writeValue(value: { value: any; label: string }[]): void {
    if (value && Array.isArray(value)) {
      this.selectedOptions = value;
    } else {
      this.selectedOptions = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  // Component methods
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  toggleOption(option: { value: any; label: string }): void {
    const index = this.selectedOptions.findIndex(opt => 
      opt.value === option.value && opt.label === option.label
    );
    
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.emitValue();
  }

  removeTag(event: Event, index: number): void {
    event.stopPropagation();
    this.selectedOptions.splice(index, 1);
    this.emitValue();
  }

  onTagInputKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomTag(input.value);
      input.value = '';
    } else if (event.key === 'Backspace' && input.value === '' && this.selectedOptions.length > 0) {
      this.selectedOptions.pop();
      this.emitValue();
    }
  }

  onTagInputBlur(): void {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input && input.value) {
      this.addCustomTag(input.value);
      input.value = '';
    }
  }

  addCustomTag(label: string): void {
    if (label.trim()) {
      const newOption: { value: any; label: string } = {
        value: null, // null value for custom tags
        label: label.trim()
      };

      // Check if already exists in selected options
      const exists = this.selectedOptions.some(opt => 
        opt.label.toLowerCase() === label.trim().toLowerCase()
      );

      if (!exists) {
        this.selectedOptions.push(newOption);
        
        // Add to options if not already present
        const optionExists = this.options().some(opt => 
          opt.label.toLowerCase() === label.trim().toLowerCase()
        );
        
        if (!optionExists) {
          this.options().push(newOption);
          this.filteredOptions = [...this.options()];
        }
        
        this.emitValue();
      }
    }
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.filterOptions();
  }

  filterOptions(): void {
    if (!this.searchTerm) {
      this.filteredOptions = [...this.options()];
    } else {
      this.filteredOptions = this.options().filter(option =>
        option.label.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  isSelected(option: { value: any; label: string }): boolean {
    return this.selectedOptions.some(selected => 
      selected.value === option.value && selected.label === option.label
    );
  }

  private emitValue(): void {
    this.onChange([...this.selectedOptions]);
  }
}