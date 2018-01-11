import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterFied?: string, keyWords?: string): any {
    if (!filterFied || !keyWords) {
      return list;
    }
    return list.filter(item => {
      const fied = item[filterFied];
      return fied.indexOf(keyWords) >= 0;
    });
  }

}
