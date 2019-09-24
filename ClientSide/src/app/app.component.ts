import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs";
import { saveAs } from "file-saver";
import * as JSZip from 'jszip';
import { ImagesService } from './services/images.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  title = 'ClientSide'; 
  // data = [
  //   '../assets/1771.jpg',
  //   '../assets/9570.jpg',
  //   'http://localhost:50637/UploadFile/BG_0297_22.JPG',
  //   'http://localhost:50637/UploadFile/BG_0356_22.JPG'
    
  // ];
  readonly MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
  };

  getRequests = [];
  constructor(public _http: HttpClient,public service:ImagesService){}
  download() {
  var data:string[]=[""];
      for (let index = 0; index < this.service.imageTemp.length; index++) {
      data.push( this.service.imageTemp[index].url.toString());
      
    }
    debugger;
  //  this. data= this.service.urls[0].urlImage;
    this.createGetRequets(data);

    forkJoin(...this.getRequests)
     .subscribe((res) => {
      var zip = new JSZip();

      res.forEach((f, i) => {
        zip.file(`image${i}.jpg`, f);
      });

      /* With file saver */
      // zip
      //   .generateAsync({ type: 'blob' })
      //   .then(blob => saveAs(blob, 'image.zip'));

      /* Without file saver */
      zip
        .generateAsync({ type: 'blob' })
        .then(blob => {
          const a: any = document.createElement('a');
          document.body.appendChild(a);

          a.style = 'display: none';
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'pp.zip';
          a.click();
          window.URL.revokeObjectURL(url);
        });
     });
  }

  private createGetRequets(data: string[]) {
    data.forEach(url => this.getRequests.push(this._http.get(url, { responseType: 'blob' })));
  }
}

