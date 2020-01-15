import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import {
  NbAlertModule, NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbSelectModule, NbStepperModule,
  NbTableModule, NbToastrModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GbListComponent } from './gb-list/gb-list.component';
import { GbVideoComponent } from './gb-video/gb-video.component';
import { GbMapComponent } from './gb-map/gb-map.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { GbSensorsComponent } from './gb-sensors/gb-sensors.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';


const NB_MODULES = [
  NbCardModule,
  NbListModule,
  NbTreeGridModule,
  NbIconModule,
  NbTreeGridModule,
  NbInputModule,
  ThemeModule,
  NbTableModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbToastrModule,
  NbInputModule,
  NbStepperModule,
  NbAlertModule,
  NbSelectModule,
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    GbListComponent,
    GbVideoComponent,
    GbMapComponent,
    GbSensorsComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    LeafletModule,
    ...NB_MODULES,
  ],

  providers: [
  ],
})
export class UserDashboardModule { }
