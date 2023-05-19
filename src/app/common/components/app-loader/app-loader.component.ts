import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent implements OnInit {
  @Input() isLoading = false;
  constructor() {}

  ngOnInit(): void {}
}
