import { Injectable } from "@angular/core";
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class SlidesGenerator {

  img: HTMLImageElement
  string: string;
  blobImage: Blob;

  async generateAnswer() {
    // const answer = document.querySelector('#answer') as HTMLImageElement;
    const answer = document.querySelector('#question') as HTMLImageElement;
    const canvas = await html2canvas(answer, { useCORS: true });
    const base64image = await canvas.toDataURL("image/png");
    this.blobImage = await this.dataURIToBlob(base64image);
    return this.blobImage;
  }

  dataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
}
