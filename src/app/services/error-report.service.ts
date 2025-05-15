import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorReportService {
  private errorData: any;

  constructor() { }

  setErrorData(data: any): void {
    this.errorData = data;  
  }

  getErrorData(): any {
    return this.errorData;
  }
}