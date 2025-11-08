// dynamic-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { UserOption, UserSearchSelectComponent } from "./user-search-select.component";
import { Observable } from 'rxjs';

// Interfaces
export interface FormFieldConfig {
  key: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'date'
    | 'radio'
    | 'file'
    | 'number'
    | 'url'
    | 'hidden'
    | 'multiselect'
    | 'userselect';
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string, selected?: boolean }[];
  fetchOptions?: ( username:string ) => Observable<UserOption[]>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  searchable?: boolean; // Add this for multi-select
  mode?: 'multiple' | 'tags'; // Add this for multi-select
}

export interface FormSectionConfig {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  columns?: number;
}

export interface FormConfig {
  id: string;
  title: string;
  subtitle?: string;
  sections: FormSectionConfig[];
  submitText?: string;
  cancelText?: string;
}

@Component({
  selector: 'mfe-search-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectComponent, UserSearchSelectComponent],
  template: `
    <!-- Modal Backdrop -->
    <div
      *ngIf="isOpen"
      class="mfe-search-fixed mfe-search-inset-0 mfe-search-bg-black mfe-search-bg-opacity-50 mfe-search-flex mfe-search-items-center mfe-search-justify-center mfe-search-p-4 mfe-search-z-50 mfe-search-w-screen mfe-search-h-screen"
      (click)="onBackdropClick($event)"
    >
      <!-- Modal Container -->
      <div
        class="mfe-search-bg-white mfe-search-rounded-lg mfe-search-shadow-xl mfe-search-max-w-2xl mfe-search-w-full mfe-search-max-h-[90vh] mfe-search-overflow-hidden mfe-search-flex mfe-search-flex-col"
      >
        <!-- Form -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="mfe-search-flex mfe-search-flex-col mfe-search-h-full mfe-search-overflow-hidden"
        >
          <!-- Fixed Header -->
          <div
            class="mfe-search-flex-shrink-0 mfe-search-p-6 mfe-search-border-b mfe-search-border-gray-200 mfe-search-bg-white"
          >
            <h2
              class="mfe-search-text-2xl mfe-search-font-semibold mfe-search-text-gray-900"
            >
              {{ config.title }}
            </h2>
            <p
              *ngIf="config.subtitle"
              class="mfe-search-mt-1 mfe-search-text-sm mfe-search-text-gray-600"
            >
              {{ config.subtitle }}
            </p>
          </div>

          <!-- Scrollable Form Content -->
          <div class="mfe-search-flex-1 mfe-search-overflow-y-auto mfe-search-p-6">
            <div class="mfe-search-space-y-6">
              <!-- Form Sections -->
              <div
                *ngFor="let section of config.sections"
                class="mfe-search-space-y-4"
              >
                <!-- Section Header -->
                <div *ngIf="section.title" class="mfe-search-mb-4">
                  <h3
                    class="mfe-search-text-lg mfe-search-font-medium mfe-search-text-gray-900"
                  >
                    {{ section.title }}
                  </h3>
                  <p
                    *ngIf="section.description"
                    class="mfe-search-mt-1 mfe-search-text-sm mfe-search-text-gray-600"
                  >
                    {{ section.description }}
                  </p>
                </div>

                <!-- Form Fields Grid -->
                <div
                  [class]="getGridClass(section.columns || 1)"
                  class="mfe-search-gap-4"
                >
                  <!-- Text Input -->
                  <div
                    *ngFor="let field of section.fields"
                    [class.hidden]="field.hidden"
                    class="mfe-search-space-y-2"
                  >
                    <!-- Your existing modal structure remains the same -->

                    <!-- Inside the form fields section, add the multi-select case -->
                    <div *ngIf="field.type === 'multiselect'">
                      <label [for]="field.key" class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700">
                        {{ field.label }}
                        <span *ngIf="field.required" class="mfe-search-text-red-500">*</span>
                      </label>
                      
                      <mfe-search-multi-select
                        [formControlName]="field.key"
                        [options]="field.options || []"
                        [placeholder]="field.placeholder || 'Select options...'"
                        [mode]="field.mode || 'multiple'"
                        [searchable]="field.searchable ?? true"
                        [isInvalid]="isFieldInvalid(field)"
                      ></mfe-search-multi-select>
                      
                      <div *ngIf="isFieldInvalid(field)" class="mfe-search-text-sm mfe-search-text-red-600 mfe-search-mt-1">
                        {{ getFieldError(field) }}
                      </div>
                    </div>
                    <!-- user select-->
                   
                    @if(field.type === 'userselect'){
                      <mfe-search-search-select
                        [formControlName]="field.key"
                        [fetchUsers]="field.fetchOptions!"
                        [placeholder]="field.placeholder || 'Select user...'"
                      ></mfe-search-search-select>
                    }


                    <!-- Text, Email, Password -->
                    <div
                      *ngIf="
                        field.type === 'text' ||
                        field.type === 'email' ||
                        field.type === 'password' ||
                        field.type === 'url'
                      "
                    >
                      <label
                        [for]="field.key"
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        [type]="field.type"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-search-border-red-300]="isFieldInvalid(field)"
                        class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md mfe-search-shadow-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>
                    <!-- Number and hidden Input -->
                    <div
                      *ngIf="field.type === 'number' || field.type === 'hidden'"
                      [class.mfe-search-hidden]="
                        field.type === 'hidden'
                      "
                    >
                      <label
                        [for]="field.key"
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        type="number"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-search-border-red-300]="isFieldInvalid(field)"
                        class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md mfe-search-shadow-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Textarea -->
                    <div *ngIf="field.type === 'textarea'">
                      <label
                        [for]="field.key"
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <textarea
                        [id]="field.key"
                        [formControlName]="field.key"
                        [placeholder]="field.placeholder || ''"
                        [class.mfe-search-border-red-300]="isFieldInvalid(field)"
                        rows="4"
                        class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md mfe-search-shadow-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500 mfe-search-resize-none"
                      >
                      </textarea>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Select -->
                    <div *ngIf="field.type === 'select'">
                      <label
                        [for]="field.key"
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <select
                        [id]="field.key"
                        [formControlName]="field.key"
                        [class.mfe-search-border-red-300]="isFieldInvalid(field)"
                        class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md mfe-search-shadow-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500"
                      >
                      @if(!hasAnySelectedOption(field.options)){
                        <option class="mfe-search-text-gray-600" value="" selected>
                          {{ field.placeholder || 'Please select' }}
                        </option>
                      }
                        <option
                          *ngFor="let option of field.options"
                          [value]="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Checkbox -->
                    <div
                      *ngIf="field.type === 'checkbox'"
                      class="mfe-search-flex mfe-search-items-center"
                    >
                      <label
                        class="mfe-search-flex mfe-search-items-center mfe-search-space-x-2"
                      >
                        <input
                          type="checkbox"
                          [formControlName]="field.key"
                          class="mfe-search-w-4 mfe-search-h-4 mfe-search-text-blue-600 mfe-search-border-gray-300 mfe-search-rounded focus:mfe-search-ring-blue-500"
                        />
                        <span class="mfe-search-text-sm mfe-search-text-gray-700">{{
                          field.label
                        }}</span>
                      </label>
                    </div>

                    <!-- Date -->
                    <div *ngIf="field.type === 'date'">
                      <label
                        [for]="field.key"
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <input
                        [id]="field.key"
                        type="date"
                        [formControlName]="field.key"
                        [class.mfe-search-border-red-300]="isFieldInvalid(field)"
                        class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md mfe-search-shadow-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 focus:mfe-search-border-blue-500"
                      />
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                    <!-- Radio -->
                    <div *ngIf="field.type === 'radio'">
                      <label
                        class="mfe-search-block mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700"
                      >
                        {{ field.label }}
                        <span
                          *ngIf="field.required"
                          class="mfe-search-text-red-500"
                          >*</span
                        >
                      </label>
                      <div class="mfe-search-mt-2 mfe-search-space-y-2">
                        <div
                          *ngFor="let option of field.options"
                          class="mfe-search-flex mfe-search-items-center"
                        >
                          <input
                            type="radio"
                            [id]="field.key + '-' + option.value"
                            [formControlName]="field.key"
                            [value]="option.value"
                            class="mfe-search-w-4 mfe-search-h-4 mfe-search-text-blue-600 mfe-search-border-gray-300 focus:mfe-search-ring-blue-500"
                          />
                          <label
                            [for]="field.key + '-' + option.value"
                            class="mfe-search-ml-2 mfe-search-text-sm mfe-search-text-gray-700"
                          >
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                      <div
                        *ngIf="isFieldInvalid(field)"
                        class="mfe-search-text-sm mfe-search-text-red-600"
                      >
                        {{ getFieldError(field) }}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fixed Actions -->
          <div
            class="mfe-search-flex-shrink-0 mfe-search-flex mfe-search-justify-end mfe-search-space-x-3 mfe-search-p-6 mfe-search-border-t mfe-search-border-gray-200 mfe-search-bg-gray-50"
          >
            <button
              type="button"
              (click)="onCancel()"
              class="mfe-search-px-4 mfe-search-py-2 mfe-search-text-sm mfe-search-font-medium mfe-search-text-gray-700 mfe-search-bg-white mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-md hover:mfe-search-bg-gray-50 focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500"
            >
              {{ config.cancelText || 'Cancel' }}
            </button>
            <button
              type="submit"
              [disabled]="isSubmitting"
              class="mfe-search-px-4 mfe-search-py-2 mfe-search-text-sm mfe-search-font-medium mfe-search-text-white mfe-search-bg-blue-600 mfe-search-border mfe-search-border-transparent mfe-search-rounded-md hover:mfe-search-bg-blue-700 focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500 disabled:mfe-search-bg-blue-300"
            >
              {{ isSubmitting ? 'Saving...' : config.submitText || 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class DynamicFormComponent implements OnInit {
  @Input() config!: FormConfig;
  @Input() initialData: any = {};
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.patchFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.form) {
      this.createForm();
      this.patchFormValues();
    }
  }

  private patchFormValues() {
    if (!this.form || !this.initialData) return;

    Object.keys(this.initialData).forEach((key) => {
      if (this.form.get(key)) {
        this.form.get(key)!.setValue(this.initialData[key]);
      }
    });
  }

  private createForm() {
    const formControls: any = {};

    this.config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const validators = this.getValidators(field);
        let value =
          this.initialData[field.key] ||
          (field.type === 'checkbox' ? false : '');
        if (
          !this.initialData[field.key] &&  
          field.type === 'select' &&
          field.options?.some(opt => opt.selected)
        ) {
          const selectedOption = field.options.find(opt => opt.selected);
          value = selectedOption ? selectedOption.value : value;
        }
        formControls[field.key] = [value, validators];
      });
    });

    this.form = this.fb.group(formControls);
  }

  private getValidators(field: FormFieldConfig) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.validation) {
      if (field.validation.minLength) {
        validators.push(Validators.minLength(field.validation.minLength));
      }
      if (field.validation.maxLength) {
        validators.push(Validators.maxLength(field.validation.maxLength));
      }
      if (field.validation.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }
    }

    return validators;
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitted.emit(this.form.value);
      // Reset submitting state after a short delay
      setTimeout(() => {
        this.isSubmitting = false;
        this.close();
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.close();
  }

  close() {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (
      (event.target as HTMLElement).classList.contains('mfe-search-bg-opacity-50')
    ) {
      this.close();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(field: FormFieldConfig): string {
    const control = this.form.get(field.key);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${field.label} is required`;
      }
      if (control.errors['minlength']) {
        return `${field.label} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${field.label} must be less than ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return `${field.label} format is invalid`;
      }
    }
    return '';
  }

  isFieldInvalid(field: FormFieldConfig): boolean {
    const control = this.form.get(field.key);
    return !!(control?.invalid && control.touched);
  }

  hasAnySelectedOption(options: { value: any; label: string, selected?: boolean }[] | undefined ): boolean {
    if (!options || options.length === 0) return false;
    return options.some(option => option.selected);
  }

  getGridClass(columns: number): string {
    switch (columns) {
      case 1:
        return 'mfe-search-grid mfe-search-grid-cols-1';
      case 2:
        return 'mfe-search-grid mfe-search-grid-cols-1 md:mfe-search-grid-cols-2';
      case 3:
        return 'mfe-search-grid mfe-search-grid-cols-1 md:mfe-search-grid-cols-3';
      default:
        return 'mfe-search-grid mfe-search-grid-cols-1';
    }
  }
}
