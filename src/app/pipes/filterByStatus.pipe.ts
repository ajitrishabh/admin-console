import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterStatus',
    pure: false
})

export class FilterByStatus implements PipeTransform {
    transform(items: any[], status: any): any {
        return items.filter(item => item.status == status);
    }
}