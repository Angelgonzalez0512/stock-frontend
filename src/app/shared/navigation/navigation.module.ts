import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiderBarComponent } from './sider-bar/sider-bar.component';
import { ContentComponent } from './content/content.component';
import { AvatarModule } from 'primeng/avatar';
import {RouterModule} from '@angular/router';
import {MenuModule} from 'primeng/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderBarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    RouterModule,
    MenuModule
  ],exports: [
    HeaderComponent,
    FooterComponent,
    SiderBarComponent,
    ContentComponent
  ]
})
export class NavigationModule { }
