import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {

  @Input() fileBase64: string;
  @Output() fileBase64Selected: EventEmitter<string> = new EventEmitter<string>();
  selectedFile : File;
  constructor() { }

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64Selected.emit(reader.result as string);
    };
  }
}
