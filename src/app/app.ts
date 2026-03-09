import { Component, signal } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { Header } from './shared/header/header';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,CommonModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Career-sewa-web');

  constructor(public router: Router) {}

  hideHeader(): boolean {
    return this.router.url === '/login' || this.router.url ==='/register';
  }
}
