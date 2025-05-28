export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date
  DateTime: Date
  EmailAddress: string
  JSON:
    | Record<string, unknown>
    | Array<unknown>
    | string
    | number
    | boolean
    | null
  JWT: string
  PositiveInt: number
  URL: string
  UUID: string
}

export interface GoogleAuthDto {
  code: string
}

export interface UpdateGroupsDto {
  groups: string[]
}

export interface EventsQueryDto {
  groups?: string[]
  hosts?: string[]
  since?: string
  unitl?: string
  skip?: number
  take?: number
}

export interface ScheduleEventDto {
  id: string
  code: string
  subject: string
  type: string
  startsAt: string
  endsAt: string
  groups: string[]
  hosts: string[]
  room?: string
  /** Source of the event */
  //source: GqlEventSource;
  previous?: ScheduleEventDto
  next?: ScheduleEventDto
}

export interface StoredTaskDto {
  createdAt: Scalars['DateTime']
  finalHash?: Maybe<string>
  finishedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  initialHash?: Maybe<string>
  scraper?: Maybe<ScraperDto>
  //status: TaskStateDto;
  status: string
}

export interface TaskDto {
  date: Scalars['String']
  hash?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type CurrentTaskDto = {
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  status: TaskStateDto
  targetDate: Scalars['Date']
}

export interface TasksBulkDto {
  count: number
  offset?: number
}

export interface TaskStateDto {
  state:
    | 'PENDING'
    | 'RUNNING'
    | 'SUCCESS'
    | 'FAILED'
    | 'CANCELLED'
    | 'SKIPPED'
    | 'OUTDATED'
}

export interface FinishTaskDto {
  hash: string
  result: string[] // maybe taskState?
  scraperId?: string
}

export interface ScraperDto {
  id: string
  alias: string
  lastSeen?: Scalars['DateTime']
  state: string
}

export interface CreateScraperDto {
  name: string
}

export interface WorkingScraperDto {
  alias: Scalars['String']
  currentTask?: Maybe<CurrentTaskDto>
  id: Scalars['ID']
  lastSeen: Scalars['DateTime']
  state: Scalars['String']
}
