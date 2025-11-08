import { Component, Injector, OnInit, ViewChild, ViewContainerRef, effect, inject, signal } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { searchStore } from '../data-access/search-store';
import { HeaderComponent } from "../ui/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TabsComponent, TapComponent, ContentComponent } from "../ui/taps.component";
import { HomeShellComponent } from "./home/feature/home-shell.component";
import { AboutShellComponent } from "./about/feature/about-shell.component";
import { JobsShellComponent } from "./jobs/feature/jobs-shell.component";
import { loadRemoteModule } from '@angular-architects/native-federation';


@Component({
  selector: 'mfe-search-me-shell',
  imports: [SectionComponent, HeaderComponent, TabsComponent, TapComponent, ContentComponent, HomeShellComponent, AboutShellComponent, JobsShellComponent],
  template: `
    <app-section ngxClass="md:mfe-search-pt-[5rem]" >
      <div class="mfe-search-w-full mfe-search-mb-40 md:mfe-search-space-x-6 md:mfe-search-flex">
        <div class="mfe-search-w-full">
          <div class="mfe-search-w-full mfe-search-flex mfe-search-flex-col mfe-search-space-y-4">
          @let search = searchInStore();
          @let isCurrentsearch = isCurrentsearchInStore();
          @if(search){
            <mfe-search-header [isCurrentsearch]="isCurrentsearch" [search]="search" (update)="updateHeader($event)"></mfe-search-header>
            <mfe-search-tabs [activeTab]="activeTab()" (onChange)="onChangeTab($event)">

              @for (avinableTab of avinableTabs; track $index) {
                <mfe-search-tap [label]="avinableTab"></mfe-search-tap>
              }

              <mfe-search-content label="Home" [template]="home">
                <ng-template #home>
                <mfe-search-home-shell></mfe-search-home-shell>
                </ng-template>
              </mfe-search-content>

              <mfe-search-content label="About" [template]="about">
                <ng-template #about>
                <mfe-search-about-shell [isCurrentsearch]="isCurrentsearch"></mfe-search-about-shell>
                </ng-template>
              </mfe-search-content>

              <mfe-search-content label="Jobs" [template]="jobs">
                <ng-template #jobs>
                <mfe-search-jobs-shell [isCurrentsearch]="isCurrentsearch"></mfe-search-jobs-shell>
                </ng-template>
              </mfe-search-content>
            </mfe-search-tabs>

          }
          </div>
        </div>
        <div class="mfe-search-hidden mfe-search-w-[400px] lg:mfe-search-block">
          <ng-template #switchAccount></ng-template>
        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements OnInit {
  private searchStore = inject(searchStore);
  private injector = inject(Injector);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = signal('Home');
  avinableTabs = ['Home', 'About', 'Jobs'];

  searchInStore = this.searchStore.search;
  isCurrentsearchInStore  = this.searchStore.isCurrentsearch;

  @ViewChild('switchAccount', { read: ViewContainerRef, static: true })
  switchAccountContainer!: ViewContainerRef;
  
  constructor() {
    effect(() => {
      if (this.isCurrentsearchInStore()) {
        this.loadsSwitchAccountComponent();
      } else {
        this.switchAccountContainer.clear();
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const searchname = params.get('username')!;
      this.searchStore.loadsearch(searchname);
    });
    this.route.queryParamMap.subscribe(params => {
      const activeTab = params.get('tab');
      if(activeTab && this.avinableTabs.includes(activeTab)){
        this.activeTab.set(activeTab);
        return;
      }
      this.activeTab.set('Home');
    });
  }

  async loadsSwitchAccountComponent() {
    const switchAccountModule = await loadRemoteModule({
      remoteName: 'shared', 
      exposedModule: './ShellSwitchAccountComponent'
    });

    const shellSwitchAccountComponent = switchAccountModule.ShellSwitchAccountComponent;

    this.switchAccountContainer.createComponent(shellSwitchAccountComponent, { injector: this.injector });
  }

  updateHeader(data: { name?: string; headline?: string; avatar?:File; bg?:File; action:string; }) {
    this.searchStore.updateHeader(data);
  }

  onChangeTab(tab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    }).then(() => {
      this.activeTab.set(tab);
    });
  }
}
