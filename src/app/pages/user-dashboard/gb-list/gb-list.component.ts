import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-gb-list',
  templateUrl: './gb-list.component.html',
  styleUrls: ['./gb-list.component.scss'],
})
export class GbListComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserGbs().subscribe(v => {
      // console.log(v);
    });
  }

}
