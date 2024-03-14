import i18next from "i18next"
import toast from "react-hot-toast"
import { APIRetailer } from "src/api/retailers"
import { parseError } from "src/services/errorHandler"
import { Camelize, toCamelArrayObj } from "src/services/utilities"

export namespace RetailerManager {

  type ListRetailerResult = {
    total: number,
    data: RetailerViewType[]
  }

  export type RetailerViewType = Camelize<{
    id: number
    CreatedAt: string
    UpdatedAt: string
    name: string
    Active: boolean
    Products: any
    user_id: number
    Store: boolean
    provider_id: number
    nit: string
    is_wholesaler: boolean
  }>

  export type EditRetailerFormParams = Camelize<{
    id: number
    name: string
    active: boolean
    provider_id: number
    nit: string
    is_wholesaler: boolean
  }>

  export type CreateRetailerFormParams = Camelize<{
    name: string
    active: boolean
    nit: string
    is_wholesaler: boolean
  }>


  export type RetailersListPageParams = {
    page: number;
    pageSize: number;
    filters: RetailerSearchFormParams
  };

  export type RetailerSearchFormParams = {
    providerID: string | number
  };

  export async function listRetailer(params: RetailersListPageParams) {
    try {
      const resAPI = await APIRetailer.listRetailer(params.filters.providerID);
      const { data } = resAPI;
      const camelCaseArray = toCamelArrayObj(data.retailers);
      const { page, pageSize } = params;

      return {
        data: camelCaseArray.slice(page, (page + 1) * pageSize),
        total: camelCaseArray.length
      } as ListRetailerResult

    } catch (error: APIShema.ResponseStructure | unknown) {
      parseError(error, true)
      throw error;
    }
  }

  export async function editRetailer(data: EditRetailerFormParams) {
    try {
      await APIRetailer.editRetailer({
        id: data.id,
        name: data.name,
        Active: data.active,
        provider_id: data.providerId,
        nit: data.nit,
        is_wholesaler: data.isWholesaler
      } as APIRetailer.UpdateRetailerType);
      toast.success(i18next.t('globals.operationSuccess'))
    } catch (error) {
      parseError(error, true)
      throw error
    }
  }

  export async function createRetailer(providerID: number, data: CreateRetailerFormParams) {
    try {
      await APIRetailer.createRetailer({
        id: 0,
        name: data.name,
        Active: data.active,
        provider_id: providerID,
        nit: data.nit,
        is_wholesaler: data.isWholesaler
      });
      toast.success(i18next.t('globals.operationSuccess'))
    } catch (error) {
      parseError(error, true)
      throw error
    }
  }

}
