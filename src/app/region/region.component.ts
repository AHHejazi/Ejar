import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region.service';
import { Iregion, IregionVM } from './region';
import { HttpParams } from '@angular/common/http';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  showSpinner = true;
  regionVM:IregionVM
  nameAr:string="";
  nameEn:string="";
  display:string='none'
  regionId:Guid;
  loading = false;
  total = 0;
  page = 1;
  limit = 10;
   
  constructor(private regionService:RegionService,private alertService:AlertService ) { }
 
  

  getRegions():void
  {
   this.showSpinner= true;
   let params  = new HttpParams().append('nameAr', this.nameAr).append('nameEn', this.nameEn).
   append('page', this.page.toString()).append('limit', this.limit.toString())
    this.regionService.getRegions(params)
    .subscribe(regionVM => {this.regionVM = regionVM,console.log(regionVM),this.showSpinner=false});
    const message = "I have some useful information for you..."
    this.alertService.success(message);
  }

  // getRegions(): void {
  //   this.loading = true;
  //   this.messageService.getMessages({ page: this.page, limit: this.limit }).subscribe(res => {
  //     this.total = res.total;
  //     this.messages = res.messages;
  //     this.loading = false;
  //   });
  // }

  searchRegion():void
  {
    this.getRegions();
  }

  ngOnInit() {
    this.getRegions();
  }

  openModalDialog(regionId):void
  {
   this.regionId=regionId;
  this.display='block'
  }

  closeModalDialog()
  {
  this.display='none'
  }

  onCloseHandled():void
  {
    this.closeModalDialog();
  }

  deleteItem():void
  {
      this.regionService.deleteRegion(this.regionId).subscribe(
        res => {
          console.log(res);
          this.getRegions();
        },
        err => {
          console.log("Error occured");
        }
      );
      
  }



  goToPage(n: number): void {
    this.page = n;
    this.getRegions();
  }

  onNext(): void {
    this.page++;
    this.getRegions();
  }

  onPrev(): void {
    this.page--;
    this.getRegions();
  }

}
