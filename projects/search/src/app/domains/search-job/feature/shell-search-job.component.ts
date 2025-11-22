import { Component, OnInit, inject } from '@angular/core';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchJobResultsComponent } from "./jobs-results/feature/shell-job-results.component";
import { SearchJobStore } from '../data-access/search-job.store';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'mfe-search-job',
    templateUrl: 'shell-search-job.component.html',
    imports: [SectionComponent, SearchJobResultsComponent]
})

export class ShellSearchJobComponent implements OnInit {
    private debounceTimer: ReturnType<typeof setTimeout> | null = null;
    private searchJobStore = inject(SearchJobStore);

    
    jobs = this.searchJobStore.jobs;

    ngOnInit(): void {
        window.addEventListener('mfe-search:domains:job', this.listener);
        this.searchJobStore.listner();
    }

    listener = (event: Event) => {
        const { detail } = event as CustomEvent;
        const safe = detail.replace(/<[^>]*>/g, '').trim();
        
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
                this.searchJobStore.loadSearchedJobs(safe);
        }, 300);
    };
}