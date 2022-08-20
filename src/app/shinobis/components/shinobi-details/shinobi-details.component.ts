import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShinobiService } from '../../services/shinobi.service';

@Component({
  selector: 'app-shinobi-details',
  templateUrl: './shinobi-details.component.html',
  styleUrls: ['./shinobi-details.component.scss']
})
export class ShinobiDetailsComponent implements OnInit {

  public shinobiId: number | null = null;
  public shinobiDetail: any | null = null;
  public backToPrevious: string = "back to previous";

  constructor(private activatedRouter: ActivatedRoute,
              private shinobiService: ShinobiService,
              private router: Router) { }

  ngOnInit(): void {
    // Get the shinobi detail of the selected list item by using Id passed in route params 
    this.activatedRouter.paramMap.subscribe((params)=>{
      this.shinobiId = Number(params.get("id"));
      this.shinobiService.getShinobiById(this.shinobiId).subscribe((shinobi)=>{
        this.shinobiDetail = shinobi[0];
      });
    })
  }

  public shinobiKeys(): Array<string> {
    return Object.keys(this.shinobiDetail);
  }

  public navigateToList(){
    this.router.navigate(['/shinonbi']);
  }

}
