import { Nuvemshop } from "../src/index";

//Orders test
const execute = async () => {
  try {
    const authConfigs = {
    scope: 'write_products,read_customers,write_orders,write_shipping',
    user_agent: 'Dropshope Backend (djonatas@live.com)',
    access_token: 'e1245e8f69efc94b4efd56f92d60cf3693cc0ee2',
    token_type: 'bearer',
    user_id: 2284108,
  }
  const nuvemshopInstance = Nuvemshop(authConfigs);
  console.log(await nuvemshopInstance.getOrders());
  } catch (error) {
    console.log(error);
  }
}

execute();