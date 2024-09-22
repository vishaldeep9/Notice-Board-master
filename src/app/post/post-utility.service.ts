import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostUtilityService {

  constructor() { }
  formatPostId(id:number):string
  {
    return `ID-${id}`;
  }
}
