/**
 * Created by zhm on 17-1-2.
 */
import { Injectable } from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {AppSettings} from './AppSettings';
@Injectable()
export class NewsService {
  private http:Http;
  private newsTypes:any;
  private observable:Observable<any>;
  constructor(http: Http) {
    this.http = http;
  }
  requestData(obj) {
    let params:URLSearchParams = objToSearchParams(obj);
    return this.http.get(`${AppSettings.API_ENDPOINT}/news`,{search:params})
        .map(res => res.json().data.content).catch(this.handleError);
  }
  getNewsChannel() {
    //获取新闻频道，并缓存起来。
    if(this.newsTypes) {
      return Observable.of(this.newsTypes);
    } else if(this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(`${AppSettings.API_ENDPOINT}/newsType`)
        .map(response =>  {
          this.observable = null;
          if(response.status == 400) {
            return "FAILURE";
          } else if(response.status == 200) {
            this.newsTypes = response.json().data;
            return this.newsTypes;
          }
        })
        .share();
      return this.observable;
    }
  }
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
function objToSearchParams(obj): URLSearchParams{
  let params: URLSearchParams = new URLSearchParams();
  if(typeof(obj) === "object") {
    params.set("data", JSON.stringify(obj));
  }else{
    params.set("data", obj);
  }
  return params;
}
