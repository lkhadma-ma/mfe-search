import { Injectable, inject, signal } from "@angular/core";
import { searchComplated } from "./search";
import { AuthHttpService } from "@shared/auth/auth-http.service";
import { AlertService } from "@shared/commun/alert.service";



@Injectable({ providedIn: 'root' })
export class searchStore {
    // Inject
    private http = inject(AuthHttpService);
    private alert = inject(AlertService);

    // Constants
    private readonly baseUrl = 'http://localhost:8083/mbe-search/api/v1';
    
    // Signals
    private searchSignal = signal<searchComplated | null>(null);
    private isCurrentsearchSignal = signal<boolean>(false);

    // Methods
    search = this.searchSignal.asReadonly();
    isCurrentsearch = this.isCurrentsearchSignal.asReadonly();

    // Actions
    loadsearch(username: string) {
        this.http.get<{
          search: searchComplated,
          current: string
        }>(`${this.baseUrl}/companies/${username}`).subscribe(search => {
            this.searchSignal.set(search.search);
            this.isCurrentsearchSignal.set(search.current === search.search.username);
        },
        () => {
            this.searchSignal.set(null);
            this.isCurrentsearchSignal.set(false);
        }
        );
    }

    updateHeader(data: {
      name?: string;
      headline?: string;
      avatar?:File;
      bg?:File;
      action:string;
    }) {

      switch(data.action) {
        case 'name&headline':
          this.http.put<{ name: string; headline: string }>(`${this.baseUrl}/companies/header`, { name: data.name, headline: data.headline }).subscribe(({ name, headline }) => {
            const current = this.searchSignal();
            if (!current) return;
        
            this.searchSignal.set({
              ...current,
              name,
              headline,
            });
            this.alert.show('Header information updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update header information", 'error');
          }
          );
          break;
        case 'avatar':
          const formDatAavatar = new FormData();
          formDatAavatar.append('file', data.avatar!);
          this.http.put<{ avatar: string }>(`${this.baseUrl}/companies/avatar`, formDatAavatar ).subscribe(({ avatar }) => {
            const current = this.searchSignal();
            if (!current) return;
        
            this.searchSignal.set({
              ...current,
              avatar,
            });
            this.alert.show('Avatar updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update avatar", 'error');
          }
          );
          break;
        case 'bg':
          const formDataBg = new FormData();
          formDataBg.append('file', data.bg!);
          this.http.put<{ bg: string }>(`${this.baseUrl}/companies/bg`, formDataBg).subscribe(({ bg }) => {
            const current = this.searchSignal();
            if (!current) return;
        
            this.searchSignal.set({
              ...current,
              bg,
            });
            this.alert.show('Background image updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update background image", 'error');
          }
          );
          break;
        default:
          this.alert.show("Invalid action for updating header", 'error');
          return;
      }
      
    }
}