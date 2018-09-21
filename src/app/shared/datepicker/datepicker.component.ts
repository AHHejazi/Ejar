import { ViewChild, ElementRef, AfterViewInit, Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements AfterViewInit {
  @ViewChild('from') input: ElementRef;

  ngAfterViewInit() {
    $(this.input.nativeElement).calendarsPicker();
  }
}
