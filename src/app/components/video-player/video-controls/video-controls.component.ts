import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit, OnChanges {
  @Output() showFullscreen = new EventEmitter<boolean>();
  @Input() player: HTMLVideoElement;
  @Input() inFullScreenMode: boolean;
  volume = 1;
  seekLocation = 0;
  videoLoaded: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.player && this.player) {
      this.player.addEventListener('loadeddata', () => this.videoLoaded = true);
      this.player.addEventListener('timeupdate', () => this.videoTimeUpdateHandler());
      this.player.addEventListener('volumechange', () => this.videoVolumeChangeHandler());
    }
  }

  trackProgressClickHandler(): void {
    this.player.currentTime = this.seekLocation * this.player.duration;
  }

  private videoTimeUpdateHandler(): void {
    this.seekLocation = this.player.currentTime / this.player.duration;
  }

  playClickHandler(): void {
    this.player.play();
  }

  pauseClickHandler(): void {
    this.player.pause();
  }

  muteClickHandler(): void {
    this.player.muted = true;
  }

  unMuteClickHandler(): void {
    this.player.muted = false;
  }

  fullScreenClickHandler(): void {
    this.showFullscreen.emit(true);
  }

  exitFullScreenClickHandler(): void {
    this.showFullscreen.emit(false);
  }

  volumeClickHandler(): void {
    this.player.volume = this.volume;
    if (this.volume > 0) {
      this.player.muted = false;
    }
  }

  private videoVolumeChangeHandler(): void {
    this.volume = this.player.volume;
    if (this.volume === 0) {
      this.player.muted = true;
    }
  }

}
