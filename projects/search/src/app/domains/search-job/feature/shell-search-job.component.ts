import { Component, OnInit, signal } from '@angular/core';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchJobSectionComponent } from "../ui/search-job-section.component";

@Component({
    selector: 'mfe-search-job',
    templateUrl: 'shell-search-job.component.html',
    imports: [SectionComponent, SearchJobSectionComponent]
})

export class ShellSearchJobComponent {

    private openSignal = signal<boolean>(false);

    isOpen = this.openSignal.asReadonly();

    onSubmit(input :string){
        this.openSignal.set(true);
    }

}