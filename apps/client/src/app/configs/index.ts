import { environment } from '~env'

export const COMPANY_NAME = 'MoooDoNE'
export const APP_NAME = `CMoNoTH${environment.production ? '' : environment.envName}`

export const NAVIGATES = {
  TOP: '',
  SIGN_IN: '/auth/sign-in',
  AFTER_SIGN_IN: (client: string) => `/${client}`,
}

export const GUEST_PATHS = ['', 'auth']

export const COLORS = {
  DEFAULTS: {
    PROJECT: '#54555f',
  },
}

export const STORAGE = {
  ENDPOINT: 'https://storage.googleapis.com',
  // ICON: (bucket: string, clientId: Client['id']) => `${STORAGE.ENDPOINT}/${bucket}/clients/${clientId}/icon.jpg`,
}

export const TASKS = {
  TREE_STRUCTURE: {
    CARD: {
      HEIGHT: 100,
      WIDTH: 200,
    },
    MARGIN: {
      CARD: {
        SIDE: 10,
        VERTICAL: 10,
      },
      ROW: 50,
      COLUMN: 50,
    },
    STROKES: {
      DEFAULT: '#C8D4DF',
      HOVERING_RELATION: '#e00d3b',
      TEMP: '#ddd',
      HOVERING: '#C8D4DF',
    },
  },
}

export const DEFAULT_TIMEZONE = 'Asia/Tokyo'
