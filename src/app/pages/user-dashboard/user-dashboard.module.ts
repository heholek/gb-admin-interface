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
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


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
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FileUploadModule,
    ...NB_MODULES,
  ],

  providers: [
  ],
})
export class UserDashboardModule { }
