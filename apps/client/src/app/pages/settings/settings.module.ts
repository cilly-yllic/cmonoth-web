import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'
import { SettingsComponent } from './settings.component'

import { TabLinkModule } from '~atoms/tab-link/tab-link.module'

import { ClientModule } from '~organisms/settings/client/client.module'
// import { PasswordModule } from '~organisms/settings/password/password.module'
// import { EmailsModule } from '~organisms/settings/emails/emails.module'
// import { OauthModule } from '~organisms/settings/oauth/oauth.module'
// import { FilesModule } from '~organisms/settings/files/files.module'

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    TabLinkModule,
    ClientModule,
    // PasswordModule, EmailsModule, OauthModule, FilesModule
  ],
})
export class SettingsModule {}
