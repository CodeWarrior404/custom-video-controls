import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('player') player;
  @ViewChild('fullScreenPlayer') fullScreenPlayer;
  @Output() fullScreenActivated = new EventEmitter<boolean>();
  @Input() file: File;
  @Input() autoplay: boolean;
  @Input() loop: boolean;
  fileUrl: string;
  htmlVideoElement: HTMLVideoElement;
  htmlFullScreenVideoElement: HTMLVideoElement;
  showVideoControls: boolean;
  timeoutRef: any;
  fullScreenVisible: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.file && this.file) {
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }

  ngAfterViewInit(): void {
    if (this.player) {
      setTimeout(() => this.htmlVideoElement = this.player.nativeElement);
    }
  }

  mouseEnterHandler(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    this.showVideoControls = true;
    this.timeoutRef = setTimeout(() => this.showVideoControls = false, 3000);
  }

  clickHandler(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    this.showVideoControls = true;
    this.timeoutRef = setTimeout(() => this.showVideoControls = false, 3000);
  }

  mouseLeaveHandler(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
    this.timeoutRef = setTimeout(() => this.showVideoControls = false, 3000);
  }

  showHideFullScreenHandler(showFullscreen: boolean): void {
    if (showFullscreen) {
      this.fullScreenVisible = true;
      this.fullScreenActivated.emit(true);
      setTimeout(() => {
        this.htmlFullScreenVideoElement = this.fullScreenPlayer.nativeElement;
        this.transferVideoStateToFullscreen();
      });
    } else {
      this.transferVideoStateFromFullscreen();
      this.fullScreenVisible = false;
      this.fullScreenActivated.emit(false);
    }
  }

  private transferVideoStateToFullscreen(): void {
    this.htmlFullScreenVideoElement.currentTime = this.htmlVideoElement.currentTime;
    if (!this.htmlVideoElement.paused) {
      this.htmlVideoElement.pause();
      this.htmlFullScreenVideoElement.play();
    }
  }

  private transferVideoStateFromFullscreen(): void {
    this.htmlVideoElement.currentTime = this.htmlFullScreenVideoElement.currentTime;
    if (!this.htmlFullScreenVideoElement.paused) {
      this.htmlFullScreenVideoElement.pause();
      this.htmlVideoElement.play();
    }
  }

}
