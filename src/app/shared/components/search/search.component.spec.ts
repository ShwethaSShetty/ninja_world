import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and emit search text when value changes with debounce of 500ms', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.searchTextFromParent = "Naruto";
    spyOn(component.searchValueEmit, 'emit');
    tick(500);
    expect(component.searchValueEmit.emit).toHaveBeenCalledWith('Naruto');
  }));

  it('should update the searh value', () => {
    component.searchTextFromParent = "Naruto";
    expect(component.searchform.controls['searchField'].value).toBe('Naruto');
  });
});
