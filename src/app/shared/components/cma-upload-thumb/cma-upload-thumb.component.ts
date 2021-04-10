import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { environment } from 'src/environments/environment';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-upload-thumb',
  templateUrl: './cma-upload-thumb.component.html',
  styleUrls: ['./cma-upload-thumb.component.scss']
})
export class CMAUploadThumbComponent extends GenericControl<ISimpleItem> implements OnInit, OnChanges {
  @Input() public label: string = 'Drag file to upload';
  @Input() public hasUpload: boolean = false;
  @Input() public disabled: boolean = false;
  @Output() public filterEmitter = new EventEmitter<File>();

  public svgPath: string = environment.svgPath;
  public files: NgxFileDropEntry[] = [];

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.label?.currentValue) {
      this.label = changes.label.currentValue;
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.filterEmitter.emit(file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public upload = ($event: any): void => {
    this.filterEmitter.emit($event?.target?.files[0]);
  }

  public fileOver(event) { }

  public fileLeave(event) { }
}
