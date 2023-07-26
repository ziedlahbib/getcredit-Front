import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {

  ocrUrl="/django/ocr/";
  eligibiliteUrl="/django/eligibilite/";
  constructor(private http : HttpClient) { }
  upload(file: File): Observable<any[]> {
    const maxFileSize = 104857600; // 100 MB in bytes
    if (file.size > maxFileSize) {
      console.log('File size is too large!');
      // Optionally, you can show an error message to the user.
      return EMPTY;
    }
  
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any[]>(`${this.ocrUrl}`, formData);
  }
  checkEligibility(data: any): Observable<any> {
    return this.http.post<any>(this.eligibiliteUrl, data);
  }
}
