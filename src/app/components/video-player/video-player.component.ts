import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('player') player;
  @Input() file: File;
  @Input() autoplay: boolean;
  @Input() loop: boolean;
  fileUrl: string;
  htmlVideoElement: HTMLVideoElement;

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

}
