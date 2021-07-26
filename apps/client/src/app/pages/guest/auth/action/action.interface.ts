export interface QueryParams {
  apiKey: string
  mode: string
  oobCode: string
  continueUrl: string
  lang?: string
}

export interface Data {
  mode: string
}

export interface SignUpData extends Data {
  mode: string
  email: string
}
