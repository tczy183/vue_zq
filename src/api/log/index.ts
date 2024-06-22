import request from '@/api/request'
enum API {
  LOG_URL = '/api/app/log'
}

export const getLogListApi = (
  Level: any,
  Message: any,
  Properties: any,
  StartTime: any,
  EndTime: any,
  Sorting: any,
  SkipCount: any,
  MaxResultCount: any
) =>
  request.get<any, any>(
    API.LOG_URL +
      '?Level=' +
      `${Level}` +
      '&Message=' +
      `${Message}` +
      '&Properties=' +
      `${Properties}` +
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
