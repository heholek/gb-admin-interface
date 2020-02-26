import {Observable} from 'rxjs';

export interface Gb {
  _id: string;
  username: string; // Name of Gb
  color: string; // Color of the gb on map
  statusCode?: number; // Last known status of Gb
  location?: string; // Current location
  updatedAt?: string; // When updated
  version?: string; // Software version of Gb
  videoLink?: string; // Link to rtsp video stream
  ip?: string; // IP of the garbage byte
}

export abstract class GbData {
  abstract getAll(): Observable<Gb[]>;
  abstract get(id: string): Observable<Gb>;
  abstract update(user: Gb): Observable<Gb>;
  abstract create(user: Gb): Observable<Gb>;
  abstract delete(id: string): Observable<boolean>;
}
