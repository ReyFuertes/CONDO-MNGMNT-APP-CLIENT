import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { map, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy';
import { convertBlobToBase64 } from '../../util/convert-to-blob';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'cma-upload',
  templateUrl: './cma-upload.component.html',
  styleUrls: ['./cma-upload.component.scss']
})
export class CMAUploadComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() fileName: string;
  @Input() file: File;
  @Input() preview: any;
  @Output() public fileEmitter = new EventEmitter<File>();

  public svgPath: string = environment.svgPath;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    console.log(this.fileName)
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.fileName?.currentValue) {
      this.fileName = changes?.fileName?.currentValue;
    }
  }

  public onUpload = ($event: any): void => this.fileEmitter.emit($event.target.files[0]);

  public onPreview(op: any, event: any): void {
    this.onConvertBlobToBase64(this.file);
    op.toggle(event);
  }

  private onConvertBlobToBase64(file: any): any {
    convertBlobToBase64(file).pipe(
      takeUntil(this.$unsubscribe),
      map(b64Result => {
        return {
          image: b64Result,
          filename: `${uuid()}.${file.name.split('?')[0].split('.').pop()}`,
          file: file,
          size: file.size,
          mimetype: file.type
        }
      })).subscribe((b64Image) => {
        this.preview = b64Image?.image;
      });
  }
}
