import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';
import {UsersService} from '../../@core/backend/common/services/users.service';
import {GbService} from '../../@core/backend/common/services/gb.service';

@Injectable()
export class InitUserService {
    constructor(
        protected userStore: UserStore,
        private userService: UsersService,
        private gbService: GbService) { }

    initCurrentUser() {
        if (localStorage.getItem('gbUser')) {
            this.userStore.setUser(JSON.parse(localStorage.getItem('gbUser')));
            this.userService.getUserGbs(this.userStore.getUser()._id).subscribe(v => {
                this.userStore.setUserGbs(v);
                this.gbService.listenToUserGbs();
            });
        }
    }
}
