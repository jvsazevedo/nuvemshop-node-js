import { AxiosInstance } from "axios";
import * as validator from "../utils/validator";
import { Querybuilder } from "../utils/factory/querybuilder";
import { parseError } from "../utils/factory/errorHandler";

export type TShippingCarrierConfig = {
    name: string,
    callback_url: string,
    types: string
}

export interface IShippingCarrier {
  id: number;
  name: string;
  active: boolean,
  callback_url: string,
  created_at: string,
  updated_at: string
}

export type TCarrierOption = {
  code: string,
  name: string,
  additional_days?: number,
  additional_cost?: number,
  allow_free_shipping: boolean,
  active: boolean,
}

export interface IShippingCarrierOption {
  id: number,
  code: string,
  name: string,
  additional_days: number,
  additional_cost: number,
  allow_free_shipping: boolean,
  active: boolean,
  created_at: string,
  updated_at: string
}

export class ShippingCarrier {
  _httpClient: AxiosInstance;
  _apiConfig: any;

  constructor(httpClient: AxiosInstance, apiConfig: any) {
    this._httpClient = httpClient;
    this._apiConfig = apiConfig;
  }

  async registerShippingCarrier(carrierConfig: TShippingCarrierConfig) {
    try {
      const valid = validator.validadeCarrier(carrierConfig);

      if(valid) {
        const createdShippingCarrier = await this._httpClient.post<IShippingCarrier>(`${this._apiConfig.endpoints.store.shippingCarrier}`, carrierConfig);

        return createdShippingCarrier.data;
      }

      throw new Error('invalid_shipping_carrier_object');

    } catch (error) {
      throw parseError(error);
    }
  }

  async getShippingCarrier(fields?: string[] | null,  id?: number): Promise<IShippingCarrier[]> {
    try {
      let url = this._apiConfig.endpoints.store.shippingCarrier;

      if (fields) {
        url = `${this._apiConfig.endpoints.store.shippingCarrier}${Querybuilder(fields)}`;
      }

      if (id) {
        url =  `${this._apiConfig.endpoints.store.shippingCarrier}/${id}`;
      }

      const response = await this._httpClient.get<IShippingCarrier[]>(url);

      return response.data;

    }catch (error) {
      throw parseError(error);
    }
  }

  async updateShippingCarrier(shippingCarrierConfig: TShippingCarrierConfig, id: number): Promise<IShippingCarrier> {
    try {
      const response = await this._httpClient.put<IShippingCarrier>(`${this._apiConfig.endpoints.store.shippingCarrier}/${id}`, shippingCarrierConfig);

      return response.data;
    } catch (error) {
      throw parseError(error);
    }
  }

  async deleteShippingCarrier(id: number): Promise<void> {
    try {

      await this._httpClient.delete(`${this._apiConfig.endpoints.store.shippingCarrier}/${id}`);

    } catch (error) {
      throw parseError(error);
    }
  }

  //Shipping carrier options
  async registerShippingCarrierOptions(carrierOption: TCarrierOption, carrierId: number): Promise<IShippingCarrierOption> {
    try {
      const valid = validator.validadeCarrierOption(carrierOption);

      if(valid) {
        const response = await this._httpClient.post<IShippingCarrierOption>(`${this._apiConfig.endpoints.store.shippingCarrierOption.replace('carrier_id', carrierId)}`, carrierOption);

        return response.data;
      }

      throw new Error('invalid_shipping_carrier_option_object');
    } catch (error) {
      throw error;
    }
  }

  async getShippingCarrierOption(carrierId: number, fields?: string[] | null,  id?: number): Promise<IShippingCarrierOption[]> {
    try {
      let url = this._apiConfig.endpoints.store.shippingCarrierOption.replace('carrier_id', carrierId);

      if (fields) {
        url = `${this._apiConfig.endpoints.store.shippingCarrierOption.replace('carrier_id', carrierId)}${Querybuilder(fields)}`;
      }

      if (id) {
        url =  `${this._apiConfig.endpoints.store.shippingCarrierOption.replace('carrier_id', carrierId)}/${id}`;
      }

      const response = await this._httpClient.get<IShippingCarrierOption[]>(url);

      return response.data;

    }catch (error) {
      throw parseError(error);
    }
  }

  async updateShippingCarrierOption(carrierOption: TCarrierOption, carrierId: number, carrierOptionId: number): Promise<IShippingCarrierOption> {
    try {
      const response = await this._httpClient.put<IShippingCarrierOption>(`${this._apiConfig.endpoints.store.shippingCarrier.replace('carrier_id', carrierId)}/${carrierOptionId}`, carrierOption);

      return response.data;
    } catch (error) {
      throw parseError(error);
    }
  }

  async deleteShippingCarrierOption(id: number, carrierId: number): Promise<void> {
    try {
      await this._httpClient.delete(`${this._apiConfig.endpoints.store.shippingCarrier.replace('carrier_id', carrierId)}/${id}`);

    } catch (error) {
      throw parseError(error);
    }
  }
}