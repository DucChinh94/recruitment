import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Option {
  key: number;
  value: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  @Input() selectedOption: Option;
  @Output() selectedOptionChange = new EventEmitter<Option>();

  ngOnInit(): void{
  }

  select = (actualOption) => {
    // this.enableToggle();
    this.selectedOption = actualOption;
    this.selectedOptionChange.emit(this.selectedOption);
  }

}


