import request from '@/api/request'
enum API {
  RECIPE_URL = '/api/app/recipe'
}

export const getRecipeListApi = (
  RecipeNo: any,
  chgid: any,
  opid: any,
  ppid: any,
  StartTime: any,
  EndTime: any,
  Sorting: any,
  SkipCount: any,
  MaxResultCount: any
) =>
  request.get<any, any>(
    API.RECIPE_URL +
      '?RecipeNo=' +
      `${RecipeNo}` +
      '&chgid=' +
      `${chgid}` +
      '&opid=' +
      `${opid}` +
      '&ppid=' +
      `${ppid}` +
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
