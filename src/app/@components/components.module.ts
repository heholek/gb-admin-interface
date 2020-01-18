import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxValidationMessageComponent } from './validation-message/validation-message.component';
import { GbDropdownComponent } from './gb-dropdown/gb-dropdown.component';
import { NbSelectModule} from '@nebular/theme';

const COMPONENTS = [
  NgxValidationMessageComponent,
];

const NB_IMPORTS = [
    NbSelectModule,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
      ...NB_IMPORTS,
  ],
  exports: [...COMPONENTS, GbDropdownComponent],
  declarations: [...COMPONENTS, GbDropdownComponent],
})
export class ComponentsModule {
}
