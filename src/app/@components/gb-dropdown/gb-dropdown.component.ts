import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GbService, IGbs} from '../../@core/backend/common/services/gb.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngx-gb-dropdown',
  templateUrl: './gb-dropdown.component.html',
  styleUrls: ['./gb-dropdown.component.scss'],
})
export class GbDropdownComponent implements OnInit {

  @Output() selectedGb: EventEmitter<string> = new EventEmitter();
  disabled: boolean = false;
  objectKeys = Object.keys;

  gbs: IGbs;

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
    this.selectedGb.emit(this.objectKeys(this.gbs)[0]);
  }

  public onSelect(event: string) {
    this.selectedGb.emit(event);
  }

}
