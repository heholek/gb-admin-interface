import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GbService, IGbs} from '../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-dropdown',
  templateUrl: './gb-dropdown.component.html',
  styleUrls: ['./gb-dropdown.component.scss'],
})
export class GbDropdownComponent implements OnInit {

  @Output() selectedGb: EventEmitter<string> = new EventEmitter();
  objectKeys = Object.keys;

  gbs: IGbs;

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
    this.gbService.gbs.subscribe(gbs => {
      this.gbs = gbs;
    });
    this.selectedGb.emit(this.objectKeys(this.gbs)[0]);
  }

  public onSelect(event: string) {
    this.selectedGb.emit(event);
  }

}
