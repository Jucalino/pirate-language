
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { apiPirataResponse } from './pirataTraducaoResponse';

@Injectable({
  providedIn: 'root',
})
export class PirateService {
  private API = `${environment.API}/translate/pirate.json`;

  constructor(private http: HttpClient) {}
  
  buscarText(textToTranslate: string){
    const params = {
      text: textToTranslate
    }

    return this.http.get<apiPirataResponse>(this.API, { params: params })
  }
  
}
