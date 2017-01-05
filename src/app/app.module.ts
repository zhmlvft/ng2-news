import { Pipe, PipeTransform,NgModule, ErrorHandler } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChannelSlide } from '../components/channelSlide/channelSlide';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { DetailPage } from '../pages/detail/detail';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  declarations: [
    MyApp,
    ChannelSlide,
    SafePipe,
    AboutPage,
    SettingsPage,
    DetailPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回',
      iconMode: 'ios',
      tabsHideOnSubPages: true,
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    DetailPage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
