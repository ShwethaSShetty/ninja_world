import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SHINOBI_FILTERABLE_FIELDS } from '../model/constant';
import { SHINOBIS } from '../model/mock-shinobis';
import { Shinobis } from '../model/shinobis';

@Injectable({
  providedIn: 'root'
})

export class ShinobiService {

  /* get list of Shinobis - mock data */
  public getShinobis(searchText: string = ""): Observable<Shinobis[]> {
    return of(SHINOBIS).pipe(
      map((shinobiList: Shinobis[]) => {
        if (!shinobiList) return [];
        if (!searchText) return shinobiList;
        return shinobiList.filter((listItem: Shinobis) => {
          return Object.keys(listItem).some((key) => {
            return SHINOBI_FILTERABLE_FIELDS.includes(key) &&
              String(listItem[key as keyof Shinobis]).toLowerCase().includes(searchText.toLowerCase());
          });
        })
      })
    )
  }

  /* get Shinobi Detail By Id*/
  public getShinobiById(id: number) {
    return of(SHINOBIS).pipe(
      map((shinobiList: Shinobis[]) => shinobiList.filter(shinobi => {
        return shinobi['id'] === id;
      }))
    )
  }

}
