import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SHINOBIS } from '../../model/mock-shinobis';
import { ShinobiService } from '../../services/shinobi.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ShinobiListComponent } from './shinobi-list.component';
import { Router } from '@angular/router';

describe('ShinobiListComponent', () => {
  let component: ShinobiListComponent;
  let fixture: ComponentFixture<ShinobiListComponent>;
  let routerSpy:any;
  beforeEach(async () => {
    const shinobiService = jasmine.createSpyObj('ShinobiService', ['getShinobis']);
    shinobiService.getShinobis.and.returnValue(of([{...SHINOBIS[5]}]));

    routerSpy = {
      navigate : jasmine.createSpy('navigate')
    }

    await TestBed.configureTestingModule({
      declarations: [ ShinobiListComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: ShinobiService, useValue: shinobiService},{provide: Router, useValue: routerSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShinobiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return filtered Shinobi List', (done) => {
    component.filterShinobiList('Kuruma');
    expect(component.searchText).toEqual('Kuruma');
    component.shinobiObservable$.subscribe(value=>{
      expect(value.length).toEqual(1);
    })
    done();
  });

  it('should navigate shinobi Detail Page',()=>{ 
    component.searchText = "Kuruma"
    component.navigateToShinobiDetail(6);
    expect(localStorage.getItem('searchTxt')).toEqual(component.searchText);
    expect(routerSpy.navigate).toHaveBeenCalledWith([ '/shinobi-detail', 6 ]);
  });

});
