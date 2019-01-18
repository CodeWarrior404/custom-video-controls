import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  @ViewChild('player') player;
  @ViewChild('progressBar') progressBar;
  @Input() file: File;
  fileUrl: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.file && this.file) {
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }

  videoTimeUpdateHandler(e): void {
    const player: HTMLVideoElement = this.player.nativeElement;
    const progressBar: HTMLProgressElement = this.progressBar.nativeElement;
    const percent = Math.floor(player.currentTime * 100 / player.duration);
    progressBar.value = percent;
  }

  progressBarClickHandler(e): void {
    const player: HTMLVideoElement = this.player.nativeElement;
    const progressBar: HTMLProgressElement = this.progressBar.nativeElement;
    const percent = e.offsetX / progressBar.offsetWidth;
    player.currentTime = percent * player.duration;
  }

}
