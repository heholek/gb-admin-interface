import { InitUserService } from './init-user.service';
import {UserStore} from '../../@core/stores/user.store';


describe('InitUserService', () => {
  let service;
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
    service = new InitUserService(userStore);
  });

  it('should initialize user from local storage', async () => {
    // Set user in localstorage
    localStorage.setItem('gbUser', JSON.stringify({user: 'test'}));
    // Initialize user (pull from local storage
    service.initCurrentUser();
    expect(userStore.getUser()).toEqual({user: 'test'});
  });

});
