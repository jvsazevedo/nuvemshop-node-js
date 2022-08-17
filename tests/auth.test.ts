import { Auth } from "../src/index";

//Auth test
const auth = async () => {
  const authConfigs = {
    client_id: 4906,
    client_secret: 'bhWppxBzqY4rHPvCaYE57agSBFubqh1EOdsPEOAyaXLqRZeR',
    user_agent: 'Dropshope Backend (djonatas@live.com)',
    code: '33ddcdd123938c177392e86f2f3881efebbe8ace',
  }
  const authInstance = Auth(authConfigs);
  console.log(await authInstance.getToken());
}

auth();