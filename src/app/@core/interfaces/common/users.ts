import { Observable } from 'rxjs';
import { Settings } from './settings';

export interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  settings?: Settings;
  address?: Address;
  updates?: Update[];
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Update {
  status: string;
  title: string;
  message: string;
  read: boolean;
}

export abstract class UserData {
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: string): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
