import { Routes } from "@angular/router";


export const SEARCH_JOB_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./shell-search-job.component').then(m => m.ShellSearchJobComponent)
    }
];