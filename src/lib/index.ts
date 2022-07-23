import axios, { AxiosInstance } from "axios";
import { Configs } from "../utils/configs/configs";
import { TCategory, Category } from "./category";
import { TProduct, Product, TProductVariation } from "./product";

export interface IApiCredentials {
  access_token: string;
  token_type: string;
  scope: string;
  user_id: number;
  user_agent: string;
}

export class NuvemshopNode {
  apiConfig: any;
  httpClient: AxiosInstance;
  _category: Category;
  _product: Product;

  constructor(apiCredentials: IApiCredentials) {
    this.apiConfig = Configs.nuvemshop_api;
    this.httpClient = axios.create({
      baseURL: `${this.apiConfig.endpoints.store.baseUrl}/${apiCredentials.user_id}`,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': apiCredentials.user_agent,
          'Authentication': `${apiCredentials.token_type} ${apiCredentials.access_token}`
      },
    });
    this._category = new Category(this.httpClient, this.apiConfig);
    this._product = new Product(this.httpClient, this.apiConfig);
  }

  // CATEGORIES
  async registerCategory (category: TCategory) {
    return await this._category.registerCategory(category);
  }

  async getCategories(fields?: string[] | null,  id?: number): Promise<TCategory[]> {
    return await this._category.getCategories(fields, id);
  }

  async updateCategory(category: TCategory, id: number): Promise<TCategory> {
    return await this._category.updateCategory(category, id);
  }

  async deleteCategory(id: number): Promise<void> {
    return await this._category.deleteCategory(id);
  }

  // PRODUCTS
  async getProducts(fields?: string[] | null,  id?: number): Promise<TProduct[]> {
    return await this._product.getProducts(fields, id);
  }

  async updateProduct(product: TProduct, id: number): Promise<TProduct> {
    return await this._product.updateProduct(product, id);
  }

  async deleteProduct(id: number): Promise<void> {
    return await this._product.deleteProduct(id);
  }

  async registerProduct(product: TProduct): Promise<TProduct> {
    return await this._product.registerProduct(product);
  }

  async registerProductVariant(variant: TProductVariation, productId: number) {
    return await this._product.registerProductVariant(variant, productId);
  }
}