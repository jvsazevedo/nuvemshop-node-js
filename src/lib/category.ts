import { AxiosInstance } from "axios";
import * as validator from "../utils/validator";
import { Querybuilder } from "../utils/factory/querybuilder";
import { parseError } from "../utils/factory/errorHandler";

export type TCategory = { 
    id?: number;
    name: { 
        en?: string,
        es?: string,
        pt?: string,
    };
    description?: {
        en?: string,
        es?: string,
        pt?: string,
    };
    handle?: {
        en?: string,
        es?: string,
        pt?: string,
    };
    parent?: number | null;
    subcategories?: number[];
    google_shopping_category?: string | null;
    created_at?: string;
    updated_at?: string;
}

export class Category {
  _httpClient: AxiosInstance;
  _apiConfig: any;

  constructor(httpClient: AxiosInstance, apiConfig: any) {
    this._httpClient = httpClient;
    this._apiConfig = apiConfig;
  }

  async registerCategory (category: TCategory) {
    try {
        const valid = validator.validate(category);

        if(valid) {
            const createdCategory = await this._httpClient.post<Category>(`${this._apiConfig.endpoints.store.categories}`, category);

            return createdCategory.data;
        }

        throw new Error('invalid_category_object');

    } catch (error) {
      throw parseError(error);
    }
  }

  async getCategories(fields?: string[] | null,  id?: number): Promise<TCategory[]> {
      try {
          let url = this._apiConfig.endpoints.store.categories;

          if (fields) {
              url = `${this._apiConfig.endpoints.store.categories}${Querybuilder(fields)}`;
          }

          if (id) {
              url =  `${this._apiConfig.endpoints.store.categories}/${id}`;
          }

          const response = await this._httpClient.get<TCategory[]>(url);

          return response.data;

      }catch (error) {
        throw parseError(error);
      }
  }

  async updateCategory(category: TCategory, id: number): Promise<TCategory> {
      try {
          const response = await this._httpClient.put<TCategory>(`${this._apiConfig.endpoints.store.categories}/${id}`, category);

          return response.data;
      } catch (error) {
        throw parseError(error);
      }
  }

  async deleteCategory(id: number): Promise<void> {
      try {

          await this._httpClient.delete(`${this._apiConfig.endpoints.store.categories}/${id}`);

      } catch (error) {
        throw parseError(error);
      }
  }
}