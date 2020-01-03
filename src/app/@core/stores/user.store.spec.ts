import { UserStore } from './user.store';
import {User} from '../interfaces/common/users';

const testUser: User = {
    _id: 'test',
    email: 'test',
};

describe('UserStore', () => {
    let userStore;

    beforeAll(() => {
        userStore = new UserStore();
    });

    it('should set the user', () => {
        userStore.setUser(testUser);
    });

    it('should get user', () => {
        expect(userStore.getUser()).toEqual(testUser);
    });

    it('should set settings with no settings inititalized', () => {
        userStore.setSetting('setting1');
        expect(userStore.getUser().settings.themeName).toBe('setting1');
    });

    it('should set settings with settings initialized', () => {
        userStore.setSetting('setting2');
        expect(userStore.getUser().settings.themeName).toBe('setting2');
    });
});
