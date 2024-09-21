import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcase'
})
export class CamelcasePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string|undefined {

      if(!value){
        return value;
      }
      const words=value.split(/[\s_]+/);
      const camelCase=words.map((word,i)=>{
        if(i===0){
          return word.toLowerCase();
        } else 
        return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
      });
      return camelCase.join('');
  }
}
