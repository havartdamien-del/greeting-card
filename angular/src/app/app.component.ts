import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Greeting Card AI';
  currentYear = new Date().getFullYear();
  animationState = 'welcome';

  ngOnInit(): void {
    // Animation state change after component init
    setTimeout(() => {
      this.animationState = 'show';
    }, 100);
  }
}
