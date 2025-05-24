export interface GoogleAuthDto {
    code: string;
}

export interface UpdateGroupsDto {
    groups: string[];
}

export interface EventsQueryDto {
    groups?: string[];
    hosts?: string[];
    since?: string;
    unitl?: string;
    skip?: number;
    take?: number;
}

export interface ScheduleEventDto {
  id: string;
  code: string;
  subject: string;
  type: string;
  startsAt: string;
  endsAt: string;
  groups: string[];
  hosts: string[];
  room?: string;
  /** Source of the event */
  //source: GqlEventSource;
  previous?: ScheduleEventDto;
  next?: ScheduleEventDto;
}

export interface TasksBulkDto {
    count: number;
    offset?: number;
}

export interface TaskStateDto {
  state: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'SKIPPED' | 'OUTDATED';
}

export interface FinishTaskDto {
    hash: string;
    result: string[], // maybe taskState?
    scraperId?: string;
} 