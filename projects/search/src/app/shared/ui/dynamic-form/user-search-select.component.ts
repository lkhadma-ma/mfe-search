import { Component, forwardRef, OnInit, input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

export interface UserOption {
  username: string;
  avatar: string;
  name: string;
  headline?: string;
}

@Component({
  selector: 'mfe-search-search-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
<div class="mfe-search-relative mfe-search-w-full">
  <!-- Selected User -->
  <div
    class="mfe-search-flex mfe-search-items-center mfe-search-justify-between mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-lg mfe-search-bg-white mfe-search-cursor-pointer mfe-search-min-h-[44px]"
    [class.mfe-search-border-red-500]="isInvalid()"
    [class.mfe-search-border-blue-500]="isOpen"
    (click)="toggleDropdown()"
    >
    <div class="mfe-search-flex mfe-search-items-center mfe-search-gap-3">
      @if (selectedUser) {
        <img [src]="selectedUser.avatar" alt="avatar" class="mfe-search-w-8 mfe-search-h-8 mfe-search-rounded-full" />
      }
      @if (selectedUser) {
        <div class="mfe-search-flex mfe-search-flex-col">
          <span class="mfe-search-font-medium mfe-search-text-sm">{{ selectedUser.name }}</span>
          <span class="mfe-search-text-gray-500 mfe-search-text-xs">@{{ selectedUser.username }}</span>
        </div>
      } @else {
        <span class="mfe-search-text-gray-400 mfe-search-text-sm">{{ placeholder() }}</span>
      }
    </div>

    <!-- Arrow -->
    <svg class="mfe-search-w-4 mfe-search-h-4 mfe-search-text-gray-400 mfe-search-transition-transform"
      [class.mfe-search-rotate-180]="isOpen"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>

  <!-- Dropdown -->
  @if (isOpen) {
    <div
      class="mfe-search-absolute mfe-search-z-50 mfe-search-w-full mfe-search-bg-white mfe-search-border mfe-search-border-gray-200 mfe-search-rounded-lg mfe-search-shadow-xl mfe-search-mt-2 mfe-search-max-h-64 mfe-search-overflow-y-auto">
      <!-- Search Input -->
      <div class="mfe-search-p-3 mfe-search-border-b mfe-search-border-gray-100">
        <input
          type="text"
          [placeholder]="searchPlaceholder()"
          (input)="onSearchInput($event)"
          class="mfe-search-w-full mfe-search-px-3 mfe-search-py-2 mfe-search-border mfe-search-border-gray-300 mfe-search-rounded-lg mfe-search-text-sm focus:mfe-search-outline-none focus:mfe-search-ring-2 focus:mfe-search-ring-blue-500"
          />
        </div>
        <!-- Loading -->
        @if (loading) {
          <div class="mfe-search-text-center mfe-search-text-gray-500 mfe-search-text-sm mfe-search-p-3">
            Searching...
          </div>
        }
        <!-- User List -->
        @for (user of filteredUsers; track user) {
          <div
            (click)="selectUser(user)"
            class="mfe-search-flex mfe-search-items-center mfe-search-gap-3 mfe-search-px-4 mfe-search-py-3 mfe-search-cursor-pointer hover:mfe-search-bg-gray-50 mfe-search-transition">
            <img [src]="user.avatar" alt="avatar" class="mfe-search-w-8 mfe-search-h-8 mfe-search-rounded-full" />
            <div class="mfe-search-flex-1">
              <div class="mfe-search-font-medium mfe-search-text-sm">{{ user.name }}</div>
              <div class="mfe-search-text-gray-500 mfe-search-text-xs">@{{ user.username }}</div>
              @if (user.headline) {
                <div class="mfe-search-text-gray-400 mfe-search-text-xs">{{ user.headline }}</div>
              }
            </div>
            @if (selectedUser?.username === user.username) {
              <div class="mfe-search-text-blue-600 mfe-search-font-bold">✓</div>
            }
          </div>
        }
        <!-- No Results -->
        @if (!loading && filteredUsers.length === 0) {
          <div
            class="mfe-search-text-center mfe-search-text-gray-500 mfe-search-text-sm mfe-search-p-4">
            No users found
          </div>
        }
      </div>
    }
  </div>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchSelectComponent),
      multi: true
    }
  ]
})
export class UserSearchSelectComponent implements ControlValueAccessor, OnInit {
  readonly placeholder = input('Select a user...');
  readonly searchPlaceholder = input('Search users...');
  readonly isInvalid = input(false);
  readonly fetchUsers = input.required<(query: string) => Observable<UserOption[]>>();

  selectedUser: UserOption | null = null;
  filteredUsers: UserOption[] = [];
  loading = false;
  isOpen = false;

  private searchTerms = new Subject<string>();
  private onChange: (value: UserOption | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        const fetchUsers = this.fetchUsers();
        if (!term || !fetchUsers) return of([]);
        this.loading = true;
        return fetchUsers(term).pipe(
          catchError(() => of([]))
        );
      })
    ).subscribe(users => {
      this.filteredUsers = users;
      this.loading = false;
    });
  }

  writeValue(value: UserOption | null): void {
    this.selectedUser = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim();
    this.searchTerms.next(term);
  }

  selectUser(user: UserOption): void {
    this.selectedUser = user;
    this.isOpen = false;
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange(this.selectedUser);
  }
}
