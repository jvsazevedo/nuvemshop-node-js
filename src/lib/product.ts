import { AxiosInstance } from "axios";
import { Querybuilder } from "../utils/factory/querybuilder";
import { TCategory } from "./category";
import { parseError } from "../utils/factory/errorHandler";
import * as validator from "../utils/validator";

export type TAttributes = {
  en?: string,
  es?: string,
  pt?: string,
}
export type TProductImage = {
  id?: number;
  product_id?: number;
  src?: string;
  position?:number;
  created_at?: string;
  updated_at?: string;
  alt?: string;
}

export type TProductVariation = {
  id?: number;
  image_id?: number;
  product_id?: number;
  price?: string;
  promotional_price?: string | null;
  stock_management?: boolean;
  stock?: number | null;
  weight?: string | null;
  width?: string | null;
  height?: string | null;
  depth?: string | null;
  sku?: string | null;
  values?: TAttributes[] | null;
  barcode?: string | null;
  mpn?: number | null;
  age_group?: string | null;
  gender?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type TProduct = {
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
  variants?: TProductVariation[];
  images?: TProductImage[];
  categories?: TCategory[] | number[];
  categoriesId?: number[];
  brand?: string | null;
  published?: boolean;
  free_shipping?: boolean;
  video_url?: string;
  seo_title?: string;
  seo_description?: string;
  attributes?: TAttributes[];
  tags?: string;
  created_at?: string;
  updated_at?: string;
  requires_shipping?: boolean;
}

export class Product {
  _httpClient: AxiosInstance;
  _apiConfig: any;

  constructor(httpClient: AxiosInstance, apiConfig: any) {
    this._httpClient = httpClient;
    this._apiConfig = apiConfig;
  }

  async getProducts(fields?: string[] | null,  id?: number): Promise<TProduct[]> {
    try {
      let url = this._apiConfig.endpoints.store.products;

      if (fields) {
        url = `${this._apiConfig.endpoints.store.products}${Querybuilder(fields)}`;
      }

      if (id) {
        url =  `${this._apiConfig.endpoints.store.products}/${id}`;
      }

      const response = await this._httpClient.get<TProduct[]>(url);

      return response.data;
    }catch (error) {
      throw parseError(error);
    }
  }

  async updateProduct(product: TProduct, id: number): Promise<TProduct> {
    try {
      const response = await this._httpClient.put<TProduct>(`${this._apiConfig.endpoints.store.products}/${id}`, product);

      return response.data;
    } catch (error) {
      throw parseError(error);
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {

      await this._httpClient.delete(`${this._apiConfig.endpoints.store.products}/${id}`);

    } catch (error) {
      throw parseError(error);
    }
  }

  async registerProduct(product: TProduct): Promise<TProduct> {
    try {
      const valid = validator.validateProduct(product);

      if(valid) {
          const createdProduct = await this._httpClient.post<TProduct>(this._apiConfig.endpoints.store.products, product);

          return createdProduct.data;
      }

      throw new Error('invalid_product_object');
    } catch (error) {
      throw parseError(error);
    }
  }

  async registerProductVariant (variant: TProductVariation, productId: number) {
    try {
      const createdProductVariant = await this._httpClient.post<TProductVariation>(`${this._apiConfig.endpoints.store.products}/${productId}${this._apiConfig.endpoints.store.productVariants}`, variant);

      return createdProductVariant.data;

    } catch (error) {
      throw parseError(error);
    }
  }
}