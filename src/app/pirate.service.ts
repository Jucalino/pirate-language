
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiPirataResponse } from './pirataTraducaoResponse';

@Injectable({
  providedIn: 'root',
})
export class PirateService {
  private API = `${environment.API}/translate/pirate.json`;

  constructor(private http: HttpClient) {}
  
  traduzir(textToTranslate: string){
    const params = {
      text: textToTranslate.trim()
    }

    return this.http.get<ApiPirataResponse>(this.API, { params: params })
  }
  
}
