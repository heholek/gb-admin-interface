import {Injectable} from '@angular/core';
import {User} from '../interfaces/common/users';
import {Gb} from '../interfaces/common/gb';

@Injectable({
    providedIn: 'root',
})
export class UserStore {
    private user: User;
    private gbs: Gb[];

    getUser(): User {
        return this.user;
    }
    setUser(paramUser: User) {
        localStorage.setItem('gbUser', JSON.stringify(paramUser));
        this.user = paramUser;
    }

    getUserGbs(): Gb[] {
        return this.gbs;
    }

    setUserGbs(gbs: Gb[]) {
        this.gbs = gbs;
    }

    setSetting(themeName: string) {
        if (this.user) {
            this.user['settings'] = {themeName: themeName};
        }
    }
}
