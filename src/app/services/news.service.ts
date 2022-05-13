/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../models/responseNews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private KEY = environment.newsKey ;
  private URL = environment.newsUrl;

  headlinesPage = 0;
  categoryPage = 0;
  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    'x-Api-key': this.KEY,
    'Access-Control-Allow-Origin': 'https://personal-banca-web.web.app/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'headers',
    origin: 'localhost'
  });

  query<T>(query: string) {
    return this.http.get(this.URL + query , {headers: this.headers});
  }

  getTopHeadLinesCategory(category: string = 'business') {
    this.categoryPage++;
    return this.query<RespuestaTopHeadlines>(
      `/top-headlines?language=es&country=co&category=${category}&page=${this.categoryPage}`
    );
  }
}
