import {Observable} from 'rxjs';

export interface Gb {
  username: string; // Name of Gb
  statusCode?: number; // Last known status of Gb
  location?: string; // Current location
  updatedAt?: string; // When updated
  version?: string; // Software version of Gb
  videoLink?: string; // Link to rtsp video stream
}

export abstract class GbData {
  abstract getAll(): Observable<Gb[]>;
  abstract get(id: string): Observable<Gb>;
  abstract update(user: Gb): Observable<Gb>;
  abstract create(user: Gb): Observable<Gb>;
  abstract delete(id: string): Observable<boolean>;
}
