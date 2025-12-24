export const DEFAULT_API = {
    BASE_URL: 'https://dev-api-nurture.vinova.sg/api/v1',
    TIMEOUT : 30000,
    HEADERS : {
        'Content-Type' : 'application/json'
    }
} 

export const API = {
    BASE_URL : 'http://localhost:5173'
}

export const API_ENDPOINTS = {
    //Admin auth
    API_ADMIN_LOGIN : '/admins/auth/login',
    API_ADMIN_LOGOUT : '/admins/auth/logout',
    API_REFRESH_TOKEN : '/admins/auth/refresh-access-token',

    //Admin admin
    API_ADMIN_ADMINS : '/admins/admins',
    API_ADMIN_ADMINS_ID : (id : string) => `/admins/admins/${id}`,

    //Admin doula
    API_ADMIN_DOULA : '/admins/doulas',
    API_ADMIN_DOULA_ID : (id : string) => `/admins/doulas/${id}`,

    //Admin client
    API_ADMIN_CLIENT : '/admins/users',
    API_ADMIN_CLIENT_ID : (id : string) => `/admins/users/${id}`,

    //Doula
    API_DOULA_ME : 'doulas/me',
    API_DOULA_ID : (id : string) => `/admins/doulas/${id}`,
    API_DOUALA_ID_PACKAGE : (id : string) => `/admins/doulas/${id}/packages`,
    API_DOULA_SUBSCRIPTIONS_ID : (id : string) => `/admins/doula-subscriptions/${id}`,
    API_DOULA_PACKAGE : `/admins/doula-packages`,

    //review
    API_DOULA_REVIEW : `/admins/reviews`,
    API_DOULA_REVIEW_OVERVIEW : `/admins/reviews/overview`,

    //transactions
    API_TRANSACTIONS : '/admins/transactions',
    API_TRANSACTIONS_ID : (id : string) => `/admins/transactions/${id}`,

    
}

