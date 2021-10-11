import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ClientComponent } from './client.component'
import { UserModule } from '~organisms/settings/client/user/user.module'
// import { OrgModule } from '~organisms/settings/client/org/org.module'
import { DynamicModule } from '~atoms/dynamic/dynamic.module'

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, DynamicModule, UserModule,
    // OrgModule
  ],
  exports: [ClientComponent],
})
export class ClientModule {}
