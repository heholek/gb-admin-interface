import {Injectable} from '@angular/core';
import {User} from '../interfaces/common/users';

@Injectable({
    providedIn: 'root',
})
export class UserStore {
    private user: User;

    getUser(): User {
        return this.user;
    }
    setUser(paramUser: User) {
        localStorage.setItem('gbUser', JSON.stringify(paramUser));
        this.user = paramUser;
    }

    setSetting(themeName: string) {
        if (this.user) {
            if (this.user.settings) {
                this.user.settings.themeName = themeName;
            } else {
                this.user.settings = {themeName: themeName};
            }
        }
    }
}
