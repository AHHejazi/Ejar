import { Component, OnInit } from '@angular/core';
import { Iregion } from './region';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {

  pageTitle:string = "Edit Region"
  region:Iregion

  constructor(private route:ActivatedRoute,private router:Router,
    private regionService:RegionService) { }

  ngOnInit() {
    let id= this.route.snapshot.paramMap.get('id')
    this.regionService.getRegionById(id).subscribe(region => this.region = region);
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
