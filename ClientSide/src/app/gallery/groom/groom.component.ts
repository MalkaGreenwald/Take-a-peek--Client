import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-groom',
  templateUrl: './groom.component.html',
  styleUrls: ['./groom.component.css']
})
export class GroomComponent implements OnInit {

  constructor(public imagesService: ImagesService) { }
  fileToUpload: File = null;
  url: string;
  ngOnInit() {
  }
  handleFileInput(files: FileList) {

    if (files && files[0]) {
      let _formData = new FormData();
      let base64arr: string[] = new Array();
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        base64arr.push(event.target.result);
        base64arr.push(files[0].name);
        this.InsertImage(base64arr);//send the images' url to the server = in order to init the table  

      }
      reader.readAsDataURL(files[0]);
    }
  }

  InsertImage(base64arr) {
    this.imagesService.InsertImagesGroom(base64arr).subscribe(res => {

      if (res.Status == false) {
        console.log(res.Message);
        // this.toastr.error(res.Message);
      }
      else {
        this.imagesService.isUploadingGroom = false;
        debugger;
        this.imagesService.imageMain = res.Value;
        console.log(res.Value);
        this.imagesService.imageTemp = res.Value;
        this.imagesService.maxNumPerson();
        this.imagesService.gotImages = true;
        this.imagesService.urls = new Array();
        for (var i = 0; i < this.imagesService.imageTemp.length; i++) {
          this.imagesService.urls.push(this.imagesService.imageTemp[i].url);
        }
        this.imagesService.selectedGroom = true;
      }
    });
  }

}
