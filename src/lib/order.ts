import { AxiosInstance } from "axios";
import { Querybuilder } from "../utils/factory/querybuilder";
import { parseError } from "../utils/factory/errorHandler";

export type TOrder = {
  cancel_reason?: string,
  created_at?: string,
  currency?: string,
  gateway?: string,
  id?: number,
  landing_site?: string,
  language?:string,
  location_id?: number,
  name?: string,
  note?: string,
  number?: number,
  owner_note?: string,
  payment_status?: string,
  shipping?: string,
  shipping_status?: string,
  shipping_tracking_number?: number,
  shipping_tracking_url?: string,
  shipping_min_days?: number,
  shipping_max_days?: number,
  shipping_cost_owner?: string,
  shipping_cost_customer?: string,
  shipping_option?: string,
  shipping_option_code?: string,
  shipping_option_reference?: string,
  status?: string,
  subtotal?: string,
  total?: string,
  token?: string,
  paid_at?: string,
  closed_at?: string,
  discount?: string,
  price?: string,
  price_usd?: string,
  weight?: string,
  updated_at?: string,
  shipped_at?: string,
  coupon?: [
    {
      code?: string
    }
  ],
  products?: [
    {
      depth?: string,
      height?: string,
      price?: string,
      product_id?: number,
      quantity?: number,
      free_shipping?: boolean,
      variant_id?: number,
      weight?: string,
      width?: string
    }
  ],
  billing_address?: string,
  billing_city?: string,
  billing_country?: string,
  billing_default?: boolean,
  billing_floor?: string,
  billing_locality?: string,
  billing_number?: string,
  billing_phone?: string,
  billing_province?: string,
  billing_zipcode?: string,
  extra?: {
    "gift-wrap"?: string
  },
  storefront?: string,
  shipping_pickup_type?: string,
  shipping_store_branch_name?: string,
  shipping_address?: {
    address?: string,
    city?: string,
    country?: string,
    created_at?: string,
    default?: boolean,
    floor?: string,
    id?: number,
    locality?: string,
    name?: string,
    number?: string,
    phone?: string,
    province?: string,
    updated_at?: string,
    zipcode?: string,
    customs?: {
      reference?: string,
      between_streets?: string
    }
  },
  customer?: {
    created_at?: string,
    email?: string,
    id?: number,
    last_order_id?: number,
    name?: string,
    total_spent?: string,
    total_spent_currency?: string,
    updated_at?: string,
    default_address?: {
      address?: string,
      city?: string,
      country?: string,
      created_at?: string,
      default?: boolean,
      floor?: string,
      id?: number,
      locality?: string,
      number?: string,
      phone?: string,
      province?: string,
      updated_at?: string,
      zipcode?: string
    }
  }
};

export class Order {
  _httpClient: AxiosInstance;
  _apiConfig: any;

  constructor(httpClient: AxiosInstance, apiConfig: any) {
    this._httpClient = httpClient;
    this._apiConfig = apiConfig;
  }

  async getOrders(fields?: string[] | null,  id?: number): Promise<TOrder[]> {
    try {
        let url = this._apiConfig.endpoints.store.orders;

        if (fields) {
            url = `${this._apiConfig.endpoints.store.orders}${Querybuilder(fields)}`;
        }

        if (id) {
            url =  `${this._apiConfig.endpoints.store.orders}/${id}`;
        }

        const response = await this._httpClient.get<TOrder[]>(url);

        return response.data;

    }catch (error) {
      throw parseError(error);
    }
  }
}