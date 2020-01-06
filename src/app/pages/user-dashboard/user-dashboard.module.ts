import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import {
  NbAlertModule, NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbStepperModule,
  NbTableModule, NbToastrModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GbListComponent } from './gb-list/gb-list.component';
import { GbVideoComponent } from './gb-video/gb-video.component';
import { GbMapComponent } from './gb-map/gb-map.component';
import { GbSensorsComponent } from './gb-sensors/gb-sensors.component';


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
    ...NB_MODULES,
  ],

  providers: [
  ],
})
export class UserDashboardModule { }
