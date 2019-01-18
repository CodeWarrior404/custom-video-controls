import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: File;

  fileSelectionHandler(e): void {
    if (e.target.files && e.target.files.length > 0) {
      this.selectedFile = e.target.files[0];
    }
  }

}
