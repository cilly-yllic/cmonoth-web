export interface Response<T = any> {
  exhaustiveNbHits: boolean
  hits: T[]
  hitsPerPage: number
  nbHits: number
  nbPages: number
  page: number
  params: string
  processingTimeMS: number
  query: string
}
