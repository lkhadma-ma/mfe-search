import { Routes } from "@angular/router";


export const SEARCH_ALL_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./shell-search-all.component').then(m => m.SearchAllComponent)
    }
];