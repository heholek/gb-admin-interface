import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GbService, Gbs} from '../../@core/backend/common/services/gb.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngx-gb-dropdown',
  templateUrl: './gb-dropdown.component.html',
  styleUrls: ['./gb-dropdown.component.scss'],
})
export class GbDropdownComponent implements OnInit {

  @Output() outputSelectedGb: EventEmitter<string> = new EventEmitter();
  disabled: boolean = false;
  objectKeys = Object.keys;
  @Input() selectedGb: string;

  gbs: Gbs;

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
    this.gbService.gbs.subscribe(gbs => {
      this.gbs = gbs;
    });
    if (Object.keys(this.gbs).length === 0) {
      this.disabled = true;
    }
    this.selectedGb = Object.keys(this.gbs)[0];
    this.outputSelectedGb.emit(this.objectKeys(this.gbs)[0]);
  }

  public onSelect(event: string) {
    this.outputSelectedGb.emit(event);
  }

}
