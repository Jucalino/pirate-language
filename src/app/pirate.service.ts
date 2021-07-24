
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pirata } from './pirataTraducaoResponse';

@Injectable({
  providedIn: 'root',
})
export class PirateService {
  private API = `${environment.API}/pirate.json`;

  constructor(private http: HttpClient) {}
  
  translate(textToTranslate: string){
    const params = {
      text: textToTranslate
    }

    return this.http.get<Pirata>(this.API, { params: params })
  }
  
}
