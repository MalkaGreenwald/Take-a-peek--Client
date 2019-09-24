import { Injectable, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Image } from '../models/image';
import { Url } from './url';
import { WebResult } from '../models/web-result';
import { ToastrService } from 'ngx-toastr';


const httpOptions: any = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imageMain: Image[];
  imageTemp: Image[];
  isLoading:Boolean=false;
  recycleBin: Image[] = null;
  isHome: boolean = true;
  showCycle: boolean = false;
  isUploadingGroom:boolean=false;
  firstRecycleBin: Image;
  numPersonTemp: number = 0;
  selectedGroom: any;
  public urls: Url[] = new Array;
  sizeUploadFiles: number;
  gotImages: boolean = false;
  // constructor(private http: HttpClient,private toastr:ToastrService
    // ,private cdRef: ChangeDetectorRef,
    // ) {
  currentUrl: Url = new Url;
  constructor(private http: HttpClient,private toastr:ToastrService) {
    this.isLoading=true;
    this.getImages().subscribe(res => {
      if (res.Status == false) {
        this.toastr.error(res.Message);
        console.log(res.Message);
      }
      else {
        this.imageMain = res.Value;
        this.imageTemp = res.Value;
        this.gotImages = true;
        this.isLoading=false;
        for (var i = 0; i < this.imageTemp.length; i++) {
          this.urls.push(this.imageTemp[i].url);
        }

      }
      this.getRecycleBin().subscribe(res => {
        if (res.Status == false) {
          this.toastr.error(res.Message);
          console.log(res.Message);
        }
        else {
          this.recycleBin = res.Value;
          debugger;
        }
        this.hasGroom().subscribe(res => {
          if (res.Status == false) {
            this.selectedGroom=false;
            this.toastr.error(res.Message);
            console.log(res.Message);
          }
          else {
            this.selectedGroom = res.Value;
          }
        })

      });
    });

  }
  InsertImages(base64arr, sizeFiles): Observable<WebResult<Image[]>> {
    //const headers= new HttpHeaders({'Content-Type':'application/json'});
    this.sizeUploadFiles = sizeFiles;
    return this.http.post<WebResult<Image[]>>(environment.baseRoute + 'Image/InsertImages',base64arr);

  }
  hasGroom() {
    return this.http.get<WebResult<any>>(environment.baseRoute + 'Image/HasGroom');
  }
  getImages(): Observable<WebResult<Image[]>> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');
    // return this.http.get<Account>(baseUrl + 'accounts',  {headers});
    return this.http.get<WebResult<Image[]>>(environment.baseRoute + 'Image/getImages', { headers });

  }
  InsertImagesGroom(base64arr) {
    return this.http.post<WebResult<any>>(environment.baseRoute + 'Image/InsertGroom', base64arr);

  }
  maxNumPerson() {
    var max: number = 0
    this.imageTemp.forEach(element => {
      if (element.numPerson > max)
        max = element.numPerson
    });
    this.numPersonTemp = max;
  }
  img: Image;
  DeleteImage(url) {
    debugger;
    this.img = new Image();
    this.img.url = url;
    return this.http.post<WebResult<any>>(environment.baseRoute + 'Image/DeleteImage', this.img);
  }
  getRecycleBin(): Observable<WebResult<Image[]>> {
    return this.http.get<WebResult<Image[]>>(environment.baseRoute + 'Image/getRecycleBin');
  }
  DeleteImg(url) {
    debugger;
    console.log(url);
    this.imageMain = this.imageMain.filter(a => a.url != url);
    this.imageTemp = this.imageTemp.filter(a => a.url != url);
    this.urls = this.urls.filter(a => a != url);
    // this.imagesService.urls = new Array;
    // for (var i = 0; i < this.imagesService.imageTemp.length; i++) {
    //   this.imagesService.urls.push(this.imagesService.imageTemp[i].url);
    // }
    debugger;
    this.DeleteImage(url).subscribe(res => {
      if (res.Status == true)
        this.getRecycleBin().subscribe(res => {
          if (res.Status == true)
            this.recycleBin = res.Value;
          else {
            console.log(res.Message);
          }
        })
      else {
        console.log(res.Message);
      }
    });
    // this.cdRef.detectChanges();
  }
  undoDelete(img:Image)
  {
    
    debugger;
    img.isInRecycleBin = false;
    this.imageMain.push(img);
    this.imageTemp.push(img);
    // this.currentUrl.urlImage = img.url.urlImage;
    // this.currentUrl.nameImage = img.url.nameImage;
    this.urls.push(img.url);
    this.recycleBin= this.recycleBin.filter(image=>image.url!=img.url);

    // this.cdRef.detectChanges();
    return this.http.post<WebResult<any>>(environment.baseRoute+'Image/UndoDelete',img)
  }
  reset(){
    return this.http.get<WebResult<any>>(environment.baseRoute+'Image/Reset');
  }

}
