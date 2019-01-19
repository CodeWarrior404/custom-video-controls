import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SafePipe } from './pipes/safe.pipe';
import { FormsModule } from '@angular/forms';
import { VideoControlsComponent } from './components/video-player/video-controls/video-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    SafePipe,
    VideoControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
