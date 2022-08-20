import { ShinobiService } from './shinobi.service';
import { SHINOBIS } from '../model/mock-shinobis'

describe('ShinobiService', () => {
  let service: ShinobiService;
  

  beforeEach(() => {
   // TestBed.configureTestingModule({});
    service = new ShinobiService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock list data', (done: DoneFn) => {
    service.getShinobis().subscribe(value => {
        expect(value).toEqual(SHINOBIS);
        done();
      })
  });

  it('should return filtered data when searchtext is passed' , (done: DoneFn) => {
    service.getShinobis("Kurama").subscribe(value => {
        expect(value.length).toEqual(1);
        done();
      })
  });

  it('should return shinobi By Id', (done: DoneFn) => {
    service.getShinobiById(6).subscribe(value => {
        expect(value[0].name).toBe('Kurama');
        done();
      })
  });



});
