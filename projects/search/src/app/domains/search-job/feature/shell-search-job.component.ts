import { Component, OnInit } from '@angular/core';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchJobSectionComponent } from "../ui/search-job-section.component";

@Component({
    selector: 'mfe-search-job',
    templateUrl: 'shell-search-job.component.html',
    imports: [SectionComponent, SearchJobSectionComponent]
})

export class ShellSearchJobComponent {

}