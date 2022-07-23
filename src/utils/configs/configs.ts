export const Configs = {
    nuvemshop_api: {
        baseUrl: 'https://www.nuvemshop.com.br',
        endpoints: {
            auth: {
                appsGetToken: '/apps/authorize/token',
            },
            store: {
                baseUrl: 'https://api.nuvemshop.com.br/v1',
                categories: '/categories',
                products: '/products',
                productVariants: '/variants',
            }
        }
    },
    grantType: 'authorization_code'
}