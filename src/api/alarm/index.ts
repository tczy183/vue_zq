import request from '@/api/request'
enum API {
  ALARM_URL = '/api/app/alarm'
}

export const getAlarmLogListApi = (
  Level: any,
  ALID: any,
  ALCD: any,
  Message: any,
  StartTime: any,
  EndTime: any,
  Sorting: any,
  SkipCount: any,
  MaxResultCount: any
) =>
  request.get<any, any>(
    API.ALARM_URL +
      '?Level=' +
      `${Level}` +
      '&ALID=' +
      `${ALID}` +
      '&ALCD=' +
      `${ALCD}` +
      '&Message=' +
      `${Message}` +
      '&StartTime=' +
      `${StartTime}` +
      '&EndTime=' +
      `${EndTime}` +
      '&Sorting=' +
      `${Sorting}` +
      '&SkipCount=' +
      `${SkipCount}` +
      '&MaxResultCount=' +
      `${MaxResultCount}`
  )
