import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';

@Injectable()
export class InitUserService {
    constructor(protected userStore: UserStore) { }

    initCurrentUser() {
        if (localStorage.getItem('gbUser')) {
            this.userStore.setUser(JSON.parse(localStorage.getItem('gbUser')));
        }
    }
}
