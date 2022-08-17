import axios, { AxiosInstance } from "axios";
import { Configs } from "../utils/configs/configs";
import { TCategory, Category } from "./category";
import { Order, TOrder } from "./order";
import { TProduct, Product, TProductVariation } from "./product";
import { IShippingCarrier, IShippingCarrierOption, ShippingCarrier, TCarrierOption, TShippingCarrierConfig } from "./shipping_carrier";
import { IWebhook, TWebhook, Webhook } from "./webhook";

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
  _order: Order;
  _shippingCarrier: ShippingCarrier;
  _webhook: Webhook;

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
    this._order = new Order(this.httpClient, this.apiConfig);
    this._shippingCarrier = new ShippingCarrier(this.httpClient, this.apiConfig);
    this._webhook = new Webhook(this.httpClient, this.apiConfig);
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

  //ORDERS
  async getOrders(fields?: string[] | null,  id?: number): Promise<TOrder[]> {
    return await this._order.getOrders(fields, id);
  }

  //Shipping Carriers
  async registerShippingCarrier(carrierConfig: TShippingCarrierConfig) {
    return await this._shippingCarrier.registerShippingCarrier(carrierConfig);
  }

  async getShippingCarrier(fields?: string[] | null,  id?: number): Promise<IShippingCarrier[]> {
    return await this._shippingCarrier.getShippingCarrier(fields, id);
  }

  async updateShippingCarrier(shippingCarrierConfig: TShippingCarrierConfig, id: number): Promise<IShippingCarrier> {
    return await this._shippingCarrier.updateShippingCarrier(shippingCarrierConfig, id);
  }

  async deleteShippingCarrier(id: number): Promise<void> {
    return await this._shippingCarrier.deleteShippingCarrier(id);
  }

  //Shipping carrier options
  async registerShippingCarrierOptions(carrierOption: TCarrierOption, carrierId: number): Promise<IShippingCarrierOption> {
    return await this._shippingCarrier.registerShippingCarrierOptions(carrierOption, carrierId);
  }

  async getShippingCarrierOption(carrierId: number, fields?: string[] | null,  id?: number): Promise<IShippingCarrierOption[]> {
    return await this._shippingCarrier.getShippingCarrierOption(carrierId, fields, id);
  }

  async updateShippingCarrierOption(carrierOption: TCarrierOption, carrierId: number, carrierOptionId: number): Promise<IShippingCarrierOption> {
    return await this._shippingCarrier.updateShippingCarrierOption(carrierOption, carrierId, carrierOptionId);
  }

  async deleteShippingCarrierOption(id: number, carrierId: number): Promise<void> {
    return await this._shippingCarrier.deleteShippingCarrierOption(id, carrierId);
  }

  async getWebhook(fields?: string[] | null,  id?: number): Promise<IWebhook[]> {
    return await this._webhook.getWebhook(fields, id);
  }

  async registerWebhook(webhook: TWebhook) {
    return await this._webhook.registerWebhook(webhook);
  }
}