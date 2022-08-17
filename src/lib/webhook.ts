import { AxiosInstance } from "axios";
import { Querybuilder } from "../utils/factory/querybuilder";
import { parseError } from "../utils/factory/errorHandler";
import * as validator from "../utils/validator";

export type TWebhook = {
  event: string,
  url: string
}

export interface IWebhook {
  created_at: string,
  event: string,
  id: number,
  updated_at: string,
  url: string
}

export class Webhook {
  _httpClient: AxiosInstance;
  _apiConfig: any;

  constructor(httpClient: AxiosInstance, apiConfig: any) {
    this._httpClient = httpClient;
    this._apiConfig = apiConfig;
  }

  async getWebhook(fields?: string[] | null,  id?: number): Promise<IWebhook[]> {
    try {
      let url = this._apiConfig.endpoints.store.webhook;

      if (fields) {
        url = `${this._apiConfig.endpoints.store.webhook}${Querybuilder(fields)}`;
      }

      if (id) {
        url =  `${this._apiConfig.endpoints.store.webhook}/${id}`;
      }

      const response = await this._httpClient.get<IWebhook[]>(url);

      return response.data;

    }catch (error) {
      throw parseError(error);
    }
  }

  async registerWebhook(webhook: TWebhook) {
    try {
        const valid = validator.validateWebhook(webhook);

        if(valid) {
            const response = await this._httpClient.post<IWebhook>(`${this._apiConfig.endpoints.store.webhook}`, webhook);

            return response.data;
        }

        throw new Error('invalid_webhook_object');

    } catch (error) {
      throw parseError(error);
    }
  }
}
