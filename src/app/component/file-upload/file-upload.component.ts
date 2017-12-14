import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FileService } from './file.service';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {
      errors: Array<string> =[];
      dragAreaClass: string = 'dragarea';
	  @Input() userId: string;// it is registered Email of the user. Can be used to set Profile Face for persistant storage in Face Identification storage
      @Input() imageType: string;
      @Input() pictureUrl:string;
	  @Input() fileExt: string = "JPG, GIF, PNG";
	  @Input() maxFiles: number = 5;
	  @Input() maxSize: number = 5; // 5MB
      @Output() uploadStatus = new EventEmitter();
      
    constructor(private fileService: FileService,private element:ElementRef) { }

    ngOnInit() { }

    onFileChange(event){
       //let files = event.target.files; 
       //this.saveFiles(files);
       console.log('onChange');
       var reader = new FileReader();
       var image = this.element.nativeElement.querySelector('.image');

       reader.onload = function(e) {
           //var src = e.target;
          // image.src = src;
           image.src=reader.result
       };

       reader.readAsDataURL(event.target.files[0]);

    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }
    
    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    
    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event) {   
        this.dragAreaClass = "dragarea";           
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        this.saveFiles(files);
    }


    saveFiles(files){
      this.errors = []; // Clear error
      // Validate file size and allowed extensions
      if (files.length > 0 && (!this.isValidFiles(files))) {
          this.uploadStatus.emit(false);
          return;
      }  
     
      if (files.length > 0) {
            let formData: FormData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                userId: this.userId,
                imageType: this.imageType
            }
            this.fileService.upload(formData, parameters)
                .subscribe(
                success => {
                  this.uploadStatus.emit(true);
                  console.log(success)
                },
                error => {
                    this.uploadStatus.emit(true);
                    this.errors.push(error.ExceptionMessage);
                }) 
        } 
    }


    private isValidFiles(files){
       // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
            return;
        }        
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files){
        // Make array of file extensions
          var extensions = (this.fileExt.split(','))
                          .map(function (x) { return x.toLocaleUpperCase().trim() });

          for (var i = 0; i < files.length; i++) {
              // Get file extension
              var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
              // Check the extension exists
              var exists = extensions.includes(ext);
              if (!exists) {
                  this.errors.push("Error (Extension): " + files[i].name);
              }
              // Check file size
              this.isValidFileSize(files[i]);
          }
    }


    private isValidFileSize(file) {
          var fileSizeinMB = file.size / (1024 * 1000);
          var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
          if (size > this.maxSize)
              this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
    }
}
