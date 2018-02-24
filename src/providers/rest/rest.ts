import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RestProvider {

  constructor(private http: Http) { }
  
      /**
     * Creates an object through the service
     * @param  {any}  data post data
     * @param  {any}  url url
     * @return {Promise<any>} The response returned from the service
     */
    public create (url: any, data: any = {}): Promise<any> {
      return this.http.post(url, data)
                .toPromise()
                .then(response => <any>response.json())
                .catch(Promise.reject);
    }

}
