

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    MiscellaneousRoutingModule,
    MarkdownModule,
  ],
  declarations: [
    MiscellaneousComponent,
    NotFoundComponent,
    TermsAndConditionsComponent,
  ],
})
export class MiscellaneousModule { }
