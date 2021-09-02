export const TABS = {
  close: 0,
  open: 1
}

export type TabsKeys = keyof typeof TABS
export type TbsValues = typeof TABS[TabsKeys]
