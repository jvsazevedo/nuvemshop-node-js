import { TCategory } from "../../lib/category";
import { TProduct } from "../../lib/product";
import { TCarrierOption, TShippingCarrierConfig } from "../../lib/shipping_carrier";
import { TWebhook } from "../../lib/webhook";

export const validate = (category: TCategory) => !!(category.name.en || category.name.es || category.name.pt);

export const validateProduct = (product: TProduct) => !!(product.name.en || product.name.es || product.name.pt);

export const validadeCarrier = (carrierConfig: TShippingCarrierConfig) => !(!carrierConfig.callback_url || !carrierConfig.name || !carrierConfig.types);

export const validadeCarrierOption = (carrierOptConfig: TCarrierOption) => !(!carrierOptConfig.code || !carrierOptConfig.name);

export const validateWebhook = (webhookConfig: TWebhook) => !(!webhookConfig.event || !webhookConfig.url);