import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SHINOBIS } from '../../model/mock-shinobis';
import { ShinobiService } from '../../services/shinobi.service';
import { ShinobiDetailsComponent } from './shinobi-details.component';


describe('ShinobiDetailsComponent', () => {
  let component: ShinobiDetailsComponent;
  let fixture: ComponentFixture<ShinobiDetailsComponent>;
  let routerSpy:any;
 
  beforeEach(async () => {
    const shinobiService = jasmine.createSpyObj('ShinobiService', ['getShinobiById']);
    shinobiService.getShinobiById.and.returnValue(of([{...SHINOBIS[5]}]));
  
    routerSpy = {
      navigate : jasmine.createSpy('navigate')
    }
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ShinobiDetailsComponent ],
      providers: [{provide: ShinobiService, useValue: shinobiService},{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue:{
          paramMap: of({
            get: (id: number)=>{
              return 5;
            }
          })
        }}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShinobiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load shinobi detail object by ID', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    tick();
    expect(component.shinobiId).toBe(5);
    expect(component.shinobiDetail.name).toEqual({...SHINOBIS[5]}['name'])
  }));

  it('should navigate to shinobi List Page',()=>{ 
    component.navigateToList();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ '/shinonbi' ]);
  });

});
