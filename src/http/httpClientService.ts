import axios, { AxiosHeaders } from 'axios'
export class RequestParameters {
    controller?: string;
    action?: string;
    queryString?: string;
    headers?: AxiosHeaders;
    baseUrl?: string;
    fullEndPoint?: string
}


export const HttpClientService = {
    
    url(requestParameters: Partial<RequestParameters>): string {
        const mainUrl :string='https://jsonplaceholder.typicode.com';
        return `${requestParameters.baseUrl ? requestParameters.baseUrl : mainUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
    },

    async get<T>(requestParameters: Partial<RequestParameters>, id?: string) {
        let url: string = '';
        if (requestParameters.fullEndPoint) {
            url = requestParameters.fullEndPoint
        }
        else {
            url = `${this.url(requestParameters)}${id ? `?id=${id}` : ''}${requestParameters.queryString ? `/${requestParameters.queryString}` : ''}`;
            return  (await axios.get<T>(url, { headers: requestParameters.headers }))
        }
    }
    //post()
    //put()
    //delete()
   
}