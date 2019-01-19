import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit, OnChanges {
  @ViewChild('progressBar') progressBar;
  @Input() player: HTMLVideoElement;
  volume = 1;
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

  videoTimeUpdateHandler(): void {
    const progressBar: HTMLProgressElement = this.progressBar.nativeElement;
    const percent = Math.floor(this.player.currentTime / this.player.duration * 100);
    progressBar.value = percent;
  }

  playClickHandler(): void {
    this.player.play();
  }

  pauseClickHandler(): void {
    this.player.pause();
  }

  progressBarClickHandler(e): void {
    const progressBar: HTMLProgressElement = this.progressBar.nativeElement;
    const percent = e.offsetX / progressBar.offsetWidth;
    this.player.currentTime = percent * this.player.duration;
  }

  muteClickHandler(): void {
    this.player.muted = true;
  }

  unMuteClickHandler(): void {
    this.player.muted = false;
  }

  fullScreenClickHandler(): void {
    this.player.requestFullscreen();
  }

  volumeClickHandler(): void {
    this.player.volume = this.volume;
    if (this.volume > 0) {
      this.player.muted = false;
    }
  }

  videoVolumeChangeHandler(): void {
    this.volume = this.player.volume;
    if (this.volume === 0) {
      this.player.muted = true;
    }
  }

}
