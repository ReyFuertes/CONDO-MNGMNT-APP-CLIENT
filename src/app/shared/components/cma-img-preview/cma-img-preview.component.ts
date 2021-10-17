import { Component, Input, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy';
import { convertBlobToBase64 } from '../../util/convert-to-blob';

@Component({
  selector: 'cma-img-preview',
  templateUrl: './cma-img-preview.component.html',
  styleUrls: ['./cma-img-preview.component.scss']
})
export class CMAImgPreviewComponent extends GenericDestroyPageComponent implements OnInit {
  @Input() public fileName: string;
  @Input() public file: File;
  @Input() public preview: any;
  @Input() public label: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void { }

  public onPreview(op: any, event: any): void {
    this.onConvertBlobToBase64(this.file);
    op.toggle(event);
  }

  private onConvertBlobToBase64(file: any): any {
    return convertBlobToBase64(file).pipe(
      takeUntil(this.$unsubscribe),
      map(b64Result => {
        return { image: b64Result }
      })).subscribe((b64Image) => {
        this.preview = b64Image?.image;
      });
  }
}
