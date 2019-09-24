// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef, Input, HostListener } from '@angular/core';

import { FilterImage } from 'src/app/models/filter-image';
import { Image } from 'src/app/models/image';
import { ImagesService } from 'src/app/services/images.service';
import { ImagesComponent } from '../images/images.component';
import { Url } from 'src/app/services/url';
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs";
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  filterImage: FilterImage = new FilterImage();

  
  getRequests = [];
  selected: boolean = false;
  selectedGroom: boolean = false;
  fileToUpload: File = null;
  currentUrl: Url;
  Files: FileList;
  base64arr: string[] = new Array();
  numImage: number = 1;
  img = "img.jpg";
  public popoverMessage: string = 'Are you sure you want to reset your album?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public placement: string = 'bottom';
  // m: boolean;
  // imageMain: Image[];
  // imageTemp: Image[];
  constructor(public imagesService: ImagesService, public cdRef: ChangeDetectorRef, public _http: HttpClient,
    public toastr: ToastrService) { }

  ngOnInit() {
    // this.imagesService.getImages().subscribe(res => {
    //   this.imageMain = res;
    //   this.imageTemp = res;
    // })
  }
  showCycle() {
    this.imagesService.showCycle = !this.imagesService.showCycle;
    this.gotoBotton();
  }
  isShow: boolean = false;
  topPosToStartShowing = 100;
  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoBotton() {
    if (this.imagesService.showCycle)
      window.scroll({
        top: 1000000000000,
        left: 0,
        behavior: 'smooth'
      });
    if (!this.imagesService.showCycle)
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    // break;
  }

  filterAflerFalse() {
    this.imagesService.imageTemp = this.imagesService.imageMain;
    if (this.filterImage.isBlur == true)
      this.isBlur(true);
    if (this.filterImage.isDark == true)
      this.isDark(true);
    if (this.filterImage.isCloseEye == true)
      this.isCloseEye(true);
    if (this.filterImage.isCutFace == true)
      this.isCutFace(true);
    if (this.filterImage.isIndoors == true)
      this.isInside(true);
    if (this.filterImage.isOutdoors == true)
      this.isOutdoor(true);
    if (this.filterImage.isGroomAlone == true)
      this.isGroomAlone(true);
    if (this.filterImage.isGroomContain == true)
      this.isGroomContain(true);
    if (this.filterImage.ischild == true)
      this.isChild(true);
    // if (this.filterImage.isAdult == true)
    //   this.isAdult(true);
    if (this.filterImage.numChild != undefined)
      this.numPerson(this.filterImage.numChild);
    // this.images.urls = this.imagesService.imageTemp["url"];
    this.urlFilter();

  }
  urlFilter() {
    this.imagesService.urls = new Array;
    for (var i = 0; i < this.imagesService.imageTemp.length; i++) {
      var u = new Url;
      u = this.imagesService.imageTemp[i].url;
      this.imagesService.urls.push(u);
      // debugger;
    }

    this.maxNumPerson();

  }
  isBlur(blur) {
    this.filterImage.isBlur = blur;

    if (blur == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isBlur == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();
    }
    else
      this.filterAflerFalse();
  }
  isDark(dark) {
    this.filterImage.isDark = dark;
    if (dark == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isDark == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();


    }
    else
      this.filterAflerFalse();
  }
  isCloseEye(closeEye) {
    debugger;
    this.filterImage.isCloseEye = closeEye;
    if (closeEye == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isClosedEye == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();

    }
    else
      this.filterAflerFalse();
  }
  isCutFace(cutFace) {
    this.filterImage.isCutFace = cutFace;
    if (cutFace == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isCutFace == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();

    }
    else
      this.filterAflerFalse();
  }


  isInside(Inside) {
    this.filterImage.isIndoors = Inside;
    if (Inside == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isIndoors == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();

    }
    else
      this.filterAflerFalse();
  }
  isOutdoor(Outdoor) {
    this.filterImage.isOutdoors = Outdoor;
    if (Outdoor == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isOutdoors == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();
    }
    else
      this.filterAflerFalse();
  }
  isGroomAlone(GroomAlone) {
    this.filterImage.isGroomAlone = GroomAlone;
    if (GroomAlone == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isGroom == true && p.numPerson == 1);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();

    }
    else
      this.filterAflerFalse();
  }
  isGroomContain(GroomContain) {
    this.filterImage.isGroomContain = GroomContain;
    if (GroomContain == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.isGroom == true);
      // this.images.urls = this.imagesService.imageTemp["url"];
      this.urlFilter();

    }
    else
      this.filterAflerFalse();
  }
  isChild(child) {
    this.filterImage.ischild = child;
    if (child == true) {
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.hasChildren == true);
      this.urlFilter();
      // this.images.urls = this.imagesService.imageTemp["url"];
    }
    else
      this.filterAflerFalse();
  }
  // isAdult(Adult) {
  //   this.filterImage.isAdult = Adult;
  //   if (Adult == true) {
  //     this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.hasAdults == true);
  //     // this.images.urls = this.imagesService.imageTemp["url"];
  //     this.urlFilter();

  //   }
  //   else
  //     this.filterAflerFalse();
  // }
  numPerson(num) {
    // this.filterImage.numChild=num;
    // this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.numPerson==num);
    this.filterImage.numChild = undefined;
    this.filterAflerFalse();
    if (num != "") {
      this.filterImage.numChild = num;
      this.imagesService.imageTemp = this.imagesService.imageTemp.filter(p => p.numPerson == num);
      this.urlFilter();
    }

  }
  maxNumPerson() {
    this.imagesService.maxNumPerson
  }
  isClearBlur: boolean = true;
  isClearEyes: boolean = true;
  // change
  clearBlur() {
    // this.imagesService.imageTemp=
    // if (this.isClearBlur) {
    debugger
    if (this.isClearBlur) {
      this.imagesService.imageTemp.forEach(e => {
        if (e.isBlur == true)

          this.imagesService.DeleteImg(e.url);
      });
    }
    else
      this.imagesService.recycleBin.forEach(e => {
        if (e.isBlur == true)

          this.imagesService.undoDelete(e);
      });
    this.isClearBlur = !this.isClearBlur;
  }

  clearCloseEyes() {
    debugger

    if (this.isClearEyes) {
      this.imagesService.imageTemp.forEach(e => {
        if (e.isClosedEye == true)

          this.imagesService.DeleteImg(e.url);
      });
    }
    else
      this.imagesService.recycleBin.forEach(e => {
        if (e.isClosedEye == true)
          this.imagesService.undoDelete(e);
      });
    this.isClearEyes = !this.isClearEyes;
  }
  downloadZip() {
    var name = "";
    this.filterImage.isAdult == true ? name += "_Adult" : null;
    this.filterImage.isBlur == true ? name += "_Blur" : null;
    this.filterImage.isCloseEye == true ? name += "_CloseEye" : null;
    this.filterImage.isCutFace == true ? name += "_CutFace" : null;
    this.filterImage.isDark == true ? name += "_Dark" : null;
    this.filterImage.isGroomAlone == true ? name += "_GroomAlone" : null;
    this.filterImage.isGroomContain == true ? name += "_GroomContain" : null;
    this.filterImage.isIndoors == true ? name += "_Indoors" : null;
    this.filterImage.isOutdoors == true ? name += "_Outdoors" : null;
    this.filterImage.ischild == true ? name += "_child" : null;
    if (name == "")
      name = "All";
    var data: string[] = [""];
    for (let index = 0; index < this.imagesService.imageTemp.length; index++) {
      data.push(this.imagesService.imageTemp[index].url.toString());

    }
    debugger;
    this.getRequests = new Array;
    //  this. data= this.service.urls[0].urlImage;
    this.getRequests = new Array();
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
            a.download = name + '.zip';
            a.click();
            window.URL.revokeObjectURL(url);
          });
      });
  }

  private createGetRequets(data: string[]) {

    data.forEach(url => this.getRequests.push(this._http.get(url, { responseType: 'blob' })));
  }
  counter: number = 0;
  handleFileInput(files: FileList) {
    this.counter = 0;
    this.Files = files;
    let i;
    if (files && files[0]) {
      let _formData = new FormData();
      this.base64arr=new Array();
      for (i = 0; i < files.length; i++) {
        this.fileToUpload = files.item(i);
        _formData.append("file", this.fileToUpload);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          
          this.numImage++;
          // this.urls.push(this.currentUrl);
          debugger;
          this.base64arr.push(event.target.result);
          this.base64arr.push(files[this.counter].name);
          this.counter++;
          console.log(event.target.result);
          if (this.counter == files.length)
            this.InsertImages(this.base64arr, files.length);//send the images' url to the server = in order to init the table  

        }
        reader.readAsDataURL(files[i]);
      }
    }
    this.selected = true;
  }
  InsertImages(base64arr, lengthFiles) {
    debugger;
    this.imagesService.gotImages = false;
    this.imagesService.InsertImages(base64arr, lengthFiles).subscribe((res) => {
      debugger;
      if (res.Status == false) {
        console.log(res.Message);
        this.toastr.error(res.Message);
      }
      else {
        this.imagesService.imageMain = res.Value;
        this.imagesService.imageTemp = res.Value;
        this.imagesService.maxNumPerson();
        this.imagesService.gotImages = true;
        this.imagesService.urls = new Array();
        for (var i = 0; i < this.imagesService.imageTemp.length; i++) {
          this.imagesService.urls.push(this.imagesService.imageTemp[i].url);
        }
      }

      // this.urls=this.imagesService.imageTemp["url"];

    });
  }

  SelectGroom() {
    this.imagesService.selectedGroom = true;
    this.imagesService.isUploadingGroom = true;
  }
  Reset() {
    this.imagesService.reset().subscribe((res) => {
      if (res.Status == true) {
        this.imagesService.imageMain = null;
        this.imagesService.imageTemp = null;
        this.imagesService.urls = null;
      }
    });

  }
}
