declare namespace AccountManager {

  export type LoginFormParams = {
    credential?: string;
    password?: string;
    rememberMe?: boolean
  };

  export interface UserSessionData {
    userID: string | number,
    fullName: string,
    email: string,
    phone: string,
    appReference: string
    appReferenceId: string
    baseRole: string,
    permissions: string[],
    userProvider?: AccountManager.Provider,
    selectedProvider?: AccountManager.Provider,
    accessProviders: AccountManager.Provider[]
    userStores: any
  }

  export interface Provider {
    id: number | string,
    label: string,
    value: number | string,
    sales_rep_code?: number | string,
    parentID?: number | string,
    cust_code?: number | string,
    childs?: AccountManager.Provider[],
    mainWareHouse?: WarehouseData,
    userWareHouse?: WarehouseData
  }
  interface WarehouseData {
    address: string
    code: string
    id: number
    name: string
    phone: string
    storage_location: string
  }
}
