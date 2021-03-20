import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-upload',
  templateUrl: './cma-upload.component.html',
  styleUrls: ['./cma-upload.component.scss']
})
export class CMAUploadComponent implements OnInit {
  @Input() fileName: string;
  @Input() preview: any;
  @Output() public fileEmitter = new EventEmitter<File>();

  public svgPath: string = environment.svgPath;

  constructor() { }

  ngOnInit(): void { }

  public get getImagePreview(): any {
    return this.preview;
  }

  public onUpload = ($event: any): void => this.fileEmitter.emit($event.target.files[0]);
}
