import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {LocalDataSource} from 'ng2-smart-table';
import {UserStore} from '../../../@core/stores/user.store';

@Component({
  selector: 'ngx-gb-list',
  templateUrl: './gb-list.component.html',
  styleUrls: ['./gb-list.component.scss'],
})
export class GbListComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'string',
      },
      username: {
        title: 'Name',
        type: 'string',
      },
      statusCode: {
        title: 'Status Code',
        type: 'string', // TODO see below and change type to html
      },
      version: {
        title: 'Version',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;

  constructor(
      private userService: UsersService,
      private userStore: UserStore,
      ) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.userService.getUserGbs().subscribe(v => {
      if (v) {
        this.userStore.setUserGbs(v);
        // TODO add map here to change status codes into colored tabs
        this.source.load(v);
      }
    });
  }

}
