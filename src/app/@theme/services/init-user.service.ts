import { UserData } from '../../@core/interfaces/common/users';
import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable()
export class InitUserService {
    constructor(protected userStore: UserStore,
        protected usersService: UserData,
        protected themeService: NbThemeService) { }

    initCurrentUser() {
        if (localStorage.getItem('gbUser')) {
            this.userStore.setUser(JSON.parse(localStorage.getItem('gbUser')));
        }
    }
}
