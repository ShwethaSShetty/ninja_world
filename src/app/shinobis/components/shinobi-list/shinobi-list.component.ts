import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shinobis } from '../../model/shinobis';
import { SHINOBI_LIST_FIELDS } from '../../model/constant';
import { ShinobiService } from '../../services/shinobi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shinobi-list',
  templateUrl: './shinobi-list.component.html',
  styleUrls: ['./shinobi-list.component.scss']
})
export class ShinobiListComponent implements OnInit {

  public shinobiListFields: string[] = [];
  public shinobiObservable$: Observable<Shinobis[]> = new Observable();
  public searchText: string = '';
  constructor(private shinobiService: ShinobiService,
    private router: Router) { }

  ngOnInit(): void {
    /* get saved search value, to display same filtered list before navigating to detail page */
    this.filterShinobiList(localStorage.getItem('searchTxt') || '');
    this.shinobiListFields = SHINOBI_LIST_FIELDS;
  }

  /* get filtered Shinobilist by search value passed */
  public filterShinobiList(searchText: string) {
    this.searchText = searchText;
    this.shinobiObservable$ = this.shinobiService.getShinobis(searchText);
  }

  public navigateToShinobiDetail(shinobiId: number) {
    /* before navigating to detail page save the search value entered */
    localStorage.setItem('searchTxt', this.searchText)
    this.router.navigate(['/shinobi-detail', shinobiId]);
  }

}
