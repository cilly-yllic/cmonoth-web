import { Pipe, PipeTransform } from '@angular/core';
import { extract } from '~utils/converters/extract'

@Pipe({
  name: 'extract'
})
export class ExtractPipe implements PipeTransform {

  transform(value: object | any[], key: string, dummy?: any): any {
    return extract(value, key, dummy)
  }

}
