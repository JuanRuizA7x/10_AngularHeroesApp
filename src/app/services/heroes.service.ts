import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private  URL = 'https://heroescrud-fe433.firebaseio.com';

  constructor(private httpClient: HttpClient) { }

  createHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    return this.httpClient.post(`${this.URL}/heroes.json`, heroe).pipe(
      map(
        (idHeroe: any) => {
          heroe.id = idHeroe.name;
          return heroe;
        }
      )
    );
  }

  updateHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.httpClient.put(`${this.URL}/heroes/${heroe.id}.json`, heroeTemp).pipe(
      map((heroeResp: HeroeModel) => {
        heroeResp.id = heroe.id;
        return heroeResp;
      })
    );
  }

  getHeroe(id: string): Observable<HeroeModel> {
    return this.httpClient.get(`${this.URL}/heroes/${id}.json`).pipe(
      map((heroe: HeroeModel) => heroe)
    );
  }

  deleteHeroe(id: string): Observable<any> {
    return this.httpClient.delete(`${this.URL}/heroes/${id}.json`);
  }

  getHeroes(): Observable<any> {
    return this.httpClient.get(`${this.URL}/heroes.json`).pipe(
      map(this.createArray),
      // Delay intencional para mostrar el loading
      delay(1000)
    );
  }

  createArray(heroesObj: object): HeroeModel[] {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return [];
    }
    Object.keys(heroesObj).forEach(key => {
      const heroe = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
