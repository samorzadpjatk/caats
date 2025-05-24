class GoogleAuthDto {
    code: string;
}

class UpdateGroupsDto {
    groups: string[];
}

class EventsQueryDto {
    since?: string;
    until?: string;
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
