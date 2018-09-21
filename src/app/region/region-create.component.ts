import { Component, OnInit } from '@angular/core';
import { Iregion } from './region';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-region-create',
  templateUrl: './region-create.component.html',
  styleUrls: ['./region-create.component.css']
})
export class RegionCreateComponent implements OnInit {
  pageTitle:string = "Add Region"
  region:Iregion=new Iregion();

  constructor(private route:ActivatedRoute,private router:Router,
    private regionService:RegionService) { }

  ngOnInit() {
  }

  postRegion():void
  {
    this.regionService.addRegion(this.region);
  }

  onBack():void
  {
   this.router.navigate(['/region'])
  }

}
