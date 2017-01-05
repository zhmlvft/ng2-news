import {Component, Input, Output, EventEmitter,ViewChild} from '@angular/core';
import {Slides } from 'ionic-angular';
import { NewsService } from '../../pages/service/NewsService';
/*
    新闻频道组件
 */
@Component({
  selector: 'channelSlide',
  templateUrl: 'channelSlide.html',
  providers: [NewsService]
})
export class ChannelSlide {
  newsTypes:any;
  @Input("slides") slides:string[] = [];
  @Input("pageNumber") pageNumber:number = 5;//每屏显示的栏目个数
  @Output("slideClick") slideClick = new EventEmitter<number>();//点击广播
  @ViewChild('channelSlide') channelSlide: Slides;
  channelSlideOptions:any;
  selectedIndex:number = 0;
  constructor(newsService: NewsService) {
    newsService.getNewsChannel().subscribe(response => {
      this.newsTypes = response;
    })
  }
  ngOnInit() {
    this.channelSlideOptions = {
      loop: false,
      autoplay: false,
      nested:true,
      initialSlide: 0,
      pager: false,
      slidesPerView: this.pageNumber,
      paginationHide: true,
      paginationClickable: true
    };
  }

  onClick(index) {
    //点击频道
    this.selectedIndex = index;
    this.slideClick.emit(index);
    this.channelSlide.slideTo(index,300);
  }
}
