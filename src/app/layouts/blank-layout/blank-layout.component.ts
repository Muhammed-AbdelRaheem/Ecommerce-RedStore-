import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavBlankComponent,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
scrollUp():void{
  window.scrollTo(0,0)
}
}
