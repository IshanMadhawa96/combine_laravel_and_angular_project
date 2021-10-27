import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl,FormGroup,Validators} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fileuplaod';
  fileForm = new FormGroup({});
  file_error:any;
  selectedFile :File = null as any;
  selectedFileName = '';
  disable_file_uplaod_button:any = false;
  constructor(private http:HttpClient) { }

  ngOnInit():void {
    this.checkValidations();
  }

  checkValidations(){
    this.fileForm = new FormGroup({
      'file_upload' : new FormControl(null,Validators.required),
    })
  }


  Submit(){

  }

  onfileSelected(event:any){
    this.file_error = "";
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    let fileSize = 0;
    let ext = null;
    fileSize = (Math.round(this.selectedFile.size * 100 /(1024*1024))/100);
    if(fileSize > 1024){
      this.disable_file_uplaod_button = false;
      this.file_error = "File Size limited to 1Gib"
    }else{
      ext = this.selectedFile.name.split('?')[0].split('.').pop();
      if(ext=='mp4' || ext=='MP4' || ext=='pdf' || ext=='PDF' ){
        this.disable_file_uplaod_button = true;
      }else{
        this.disable_file_uplaod_button = false;
        this.file_error = "Please enter valid pdf or Video";
      }
    }
  }

}
