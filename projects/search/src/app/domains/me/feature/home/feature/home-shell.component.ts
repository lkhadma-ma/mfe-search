import { Component, OnInit, inject } from '@angular/core';
import { OverviewComponent } from "../ui/overview.component";
import { ActivatedRoute, Router } from '@angular/router';
import { RecentJobOpeningsComponent } from "../ui/recent-job-openings.component";
import { HomeStore } from '../data-access/home.store';

@Component({
  selector: 'mfe-search-home-shell',
  host: { class: 'mfe-search-w-full mfe-search-flex mfe-search-flex-col mfe-search-space-y-4' },
  template: `
  @let homeIn = home();
  @if (homeIn) {
    <mfe-search-overview (onChangeTab)="onChangeTab('About')" [overview]="homeIn.about.overview"></mfe-search-overview>
    <mfe-search-recent-job-openings (onChangeTab)="onChangeTab('Jobs')" [job]="homeIn.job" ></mfe-search-recent-job-openings>
  }
  `,
  imports: [OverviewComponent, RecentJobOpeningsComponent]
})
export class HomeShellComponent implements OnInit {
  
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #homeStore = inject(HomeStore);
  home = this.#homeStore.home;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(params => {
      const username = params.get('username')!;
      this.#homeStore.loadHome(username);
    });
  }

  onChangeTab(tab: string) {
    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }

}
