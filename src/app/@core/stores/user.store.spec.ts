import { UserStore } from './user.store';
import {User} from '../interfaces/common/users';

describe('UserStore', () => {
    const userStore = new UserStore();
    const testUser: User = {
        _id: 'test',
        email: 'test',
    };

    it('should set and get the user', async done => {
        await userStore.setUser(testUser);
        expect(userStore.getUser()).toEqual(testUser);
        done();
    });

    it('should set settings', () => {
        userStore.setUser(testUser);
        userStore.setSetting('setting1');
        expect(userStore.getUser().settings.themeName).toBe('setting1');
    });
});
