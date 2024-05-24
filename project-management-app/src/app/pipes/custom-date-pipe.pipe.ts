import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): any {
    // Check if the input value is a valid date string
    if (!value || typeof value !== 'string') return value;

    // Parse the date string
    const date = new Date(value);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) return value;

    // Format the date as "DD-MM-YYYY"
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1); // Month is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }
}
