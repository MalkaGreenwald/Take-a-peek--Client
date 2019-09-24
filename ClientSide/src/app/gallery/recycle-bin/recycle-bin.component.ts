import { Component, OnInit} from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image';
import { Url } from 'src/app/services/url';

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.css']
})
export class RecycleBinComponent implements OnInit {

  constructor(public imageService: ImagesService) { }
  currentUrl: Url = null;
  ngOnInit() {
  }
  undoDelete(img: Image) {
    this.imageService.undoDelete(img).subscribe(res => {
     
      // if (res.Status == true)
      //   this.imageService.getRecycleBin().subscribe(res => {
      //     if (res.Status == true)
      //       this.imageService.recycleBin = res.Value;
      //     else {
      //       console.log(res.Message);
      //     }
      //   })
      // else {
      //   console.log(res.Message);
      // }
    });
  
  }

}
