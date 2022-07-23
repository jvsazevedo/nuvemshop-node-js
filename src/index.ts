import { NuvemshopNode, IApiCredentials } from "./lib";
import { IProps, Authentication } from "./lib/auth";

export const Auth = ({ client_id, client_secret, user_agent, code }: IProps) => new Authentication({ client_id, client_secret, user_agent, code });

export const Nuvemshop = ({ access_token, scope, token_type, user_agent, user_id }: IApiCredentials) => new NuvemshopNode({ access_token, scope, token_type, user_agent, user_id });
