import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './settings.service';

const SERVICES = [
  { provide: SettingsData, useClass: SettingsService },
];

@NgModule({
  imports: [CommonModule],
})
export class CommonMockModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonMockModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
