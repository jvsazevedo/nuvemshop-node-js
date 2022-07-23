import { Configs } from "../utils/configs/configs";
import axios, { AxiosInstance } from "axios";
import { parseError } from "../utils/factory/errorHandler";

export interface IProps {
    client_id: number;
    client_secret: string;
    code: string;
    user_agent: string;
}

type TokenResponseData = {
    access_token: string;
    token_type: string;
    scope: string;
    user_id: number;
}

export class Authentication {
  apiConfig: any;
  httpClient: AxiosInstance;
  credentials: IProps;

  constructor(props: IProps) {
    this.apiConfig = Configs.nuvemshop_api;
    this.credentials = props;
    this.httpClient = axios.create({
      baseURL: this.apiConfig.baseUrl,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': props.user_agent,
      }
    });
  }

  async getToken () {
    const { client_id, client_secret, code } = this.credentials;
    try {
      this.configureInterceptors();
      const response = await this.httpClient.post<TokenResponseData>(this.apiConfig.endpoints.auth.appsGetToken, {
          client_id: client_id,
          client_secret: client_secret,
          grant_type: Configs.grantType,
          code: code,
      });

      return response.data;
    } catch (error) {
      throw parseError(error);
    }
  }

  configureInterceptors() {
    axios.interceptors.request.use(function (config) {
    // Do something before request is sent
      console.log(config)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    })
  }
}