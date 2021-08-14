import { MatDialogConfig } from '@angular/material/dialog'

export const setConfig = (options?: MatDialogConfig, defaultConfig?: MatDialogConfig): MatDialogConfig => {
  const configs: MatDialogConfig = {
    ...defaultConfig,
    ...options,
  }
  if (!configs.data) {
    configs.data = {}
  }
  return configs
}
