import { Component, OnInit } from '@angular/core';
import { SectionComponent } from "@shared/ui/section/section.component";
import { SearchJobSectionComponent } from "../ui/search-job-section.component";

@Component({
    selector: 'mfe-search-job',
    templateUrl: 'shell-search-job.component.html',
    styleUrl: 'shell-search-job.component.scss',
    imports: [SectionComponent, SearchJobSectionComponent]
})

export class ShellSearchJobComponent {

}