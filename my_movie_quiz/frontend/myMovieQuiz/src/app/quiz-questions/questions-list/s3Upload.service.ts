import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class s3UploadService {

  constructor(private http: HttpClient) { }

  getPresignedUrl(name: any) {
    return this.http.get('http://127.0.0.1:8000/api/presigned_url/' + name)    
  }

  uploadFile(r: any, selectedFile: any) {
    return this.http.put(r['url'], r['fields'], selectedFile)
  }
}
