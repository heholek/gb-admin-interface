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
        // Check if ther'es a logged in user
        if (localStorage.getItem('gbUser')) {
            // Set user in store class
            this.userStore.setUser(JSON.parse(localStorage.getItem('gbUser')));
            const currentUserId = this.userStore.getUser()._id;
            // Update the user from server
            this.userService.get(currentUserId).subscribe(updatedUser => {
                this.userStore.setUser(updatedUser);
            });
            // Update the users gbs
            this.userService.getUserGbs(this.userStore.getUser()._id).subscribe(v => {
                this.userStore.setUserGbs(v);
                this.gbService.listenToUserGbs();
            });
        }
    }
}
