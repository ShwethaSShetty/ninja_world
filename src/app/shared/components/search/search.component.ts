import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, interval, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

 private _searchText: string = '';
  get searchTextFromParent(): string {
    return this._searchText;
  }

  @Input('searchText')
  set searchTextFromParent(value: string) {
    this._searchText = value;
    this.updateFromControl();
  }

  searchform: FormGroup = new FormGroup({
    searchField: new FormControl()
  });

  @Output() searchValueEmit = new EventEmitter<string>();

  formCntrlSubcription: Subscription = new Subscription();
  constructor() { }

  ngOnInit(): void {
    /*Emit the user search value after every 500 seconds only if previous value is not equal to current value */
    this.formCntrlSubcription = this.searchform.controls['searchField'].valueChanges
      .pipe(debounceTime(500),
        distinctUntilChanged())
      .subscribe(searchTxt => this.searchValueEmit.emit(searchTxt));
  }

  public updateFromControl() {
    this.searchform.setValue({
      searchField: this.searchTextFromParent
    });
  }

  ngOnDestroy() {
    this.formCntrlSubcription.unsubscribe();
  }

}
