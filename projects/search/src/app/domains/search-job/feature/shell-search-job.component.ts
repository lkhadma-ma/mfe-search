import { Component, OnInit, signal } from '@angular/core';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchJobSectionComponent } from "./search-box/feature/shell-search-box.component";
import { SearchJobResultsSectionComponent } from "./jobs-results/feature/shell-job-results.component";

@Component({
    selector: 'mfe-search-job',
    templateUrl: 'shell-search-job.component.html',
    imports: [SectionComponent, SearchJobSectionComponent, SearchJobResultsSectionComponent]
})

export class ShellSearchJobComponent {

    private openSignal = signal<boolean>(true);

    isOpen = this.openSignal.asReadonly();

    onSubmit(input :string){
        this.openSignal.set(true);
    }

}