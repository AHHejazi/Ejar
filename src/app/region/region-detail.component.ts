import { Component, OnInit } from '@angular/core';
import { Iregion } from './region';
import {ActivatedRoute, Router} from '@angular/router';
import { RegionService } from '../region.service';
import { HttpParams } from '@angular/common/http';
@Component({
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements OnInit {
   pageTitle:string = 'Region Detail'; 
   region:Iregion

  constructor(private route:ActivatedRoute,private router:Router,
    private regionService:RegionService) { }

  ngOnInit() {
    let id= this.route.snapshot.paramMap.get('id')
    this.regionService.getRegionById(id).subscribe(region => this.region = region);
  }

  onBack():void
  {
   this.router.navigate(['/region'])
  }
}
