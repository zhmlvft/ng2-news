import { Component,ViewChild} from '@angular/core';

import { NavController, Slides} from 'ionic-angular';
import { NewsService } from '../service/NewsService';
import {ChannelSlide} from "../../components/channelSlide/channelSlide";
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NewsService]
})
export class HomePage {
  private newsContents:any={};//列表页新闻数据，用栏目ID区分
  typePages:any={};//保存每一类新闻的当前页
  hasMore:boolean = true;//下拉加载控制
  isAtTop:boolean = true;//上拉刷新控制
  @ViewChild('contentSlide') contentSlide: Slides;
  @ViewChild('channelSlide') channelSlide: ChannelSlide;
  contentSlideOptions:any;
  newsType:any;//新闻频道
  newsService:NewsService
  constructor(public nav: NavController,newsService: NewsService) {
    this.newsService = newsService;
    this.contentSlideOptions = {
      loop: false,
      nested:true,
      autoplay: false,
      initialSlide: 0,
      pager: false,
      slidesPerView: 1,
      paginationHide: true,
      paginationClickable: true
    };
    newsService.getNewsChannel().subscribe(response => {
      this.newsType = response;
      for(var i=0;i<response.length;i++){
        this.newsContents[response[i].channelId]=[];
        this.typePages[response[i].channelId]=1;
        if(i==0){
          //加载第一个栏目的数据，其余的数据滑动到它才去加载。
          let json = {
            page:1,
            size:20,
            data:
            {channelId:response[i].channelId}
          };
          newsService.requestData(json).subscribe(
            data => {
              let chId = data[0].channelId;
              this.newsContents[chId]=data
            }
          );
        }
      }
    });
  }
  onSlideClick(index) {
    //点击栏目的事件捕获
    this.hasMore = true;
    this.contentSlide.slideTo(index, 500);
  }
  onSlideChanged() {
    //列表页左右滑动后回调
    this.hasMore = true;
    this.isAtTop = true;
    let currentIndex = this.contentSlide.getActiveIndex();
    if(this.newsContents[this.newsType[currentIndex].channelId].length==0){
      this.getNewsData(this.newsType[currentIndex].channelId);
    }
    this.channelSlide.onClick(currentIndex);
  }

  doRefresh(refresh) {
    //刷新新闻
    this.hasMore = true;
    let currentIndex = this.contentSlide.getActiveIndex();
    this.typePages[this.newsType[currentIndex].channelId]=1;
    this.getNewsData(this.newsType[currentIndex].channelId);
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    //加载更多
    this.hasMore = false;
    let currentIndex = this.contentSlide.getActiveIndex();
    this.typePages[this.newsType[currentIndex].channelId] += 1;
    let json = {
      page: this.typePages[this.newsType[currentIndex].channelId],
      size: 20,
      data: {channelId: this.newsType[currentIndex].channelId}
    };
    this.newsService.requestData(json).subscribe(
      data => {
        if(data.length>0){
          for(let i=0;i<data.length;i++){
            this.newsContents[this.newsType[currentIndex].channelId].push(data[i]);
          }
          setTimeout(()=>{this.hasMore=true},1000);
        }else{
          this.typePages[this.newsType[currentIndex].channelId] -= 1;
        }
      }
    );
    infiniteScroll.complete();
  }

  getNewsData(channelId){
    //获取频道新闻数据
    let json = {
      page: 1,
      size: 20,
      data: {channelId: channelId}
    };
    this.newsService.requestData(json).subscribe(
      data => {
        this.newsContents[channelId] = data
      }
    );
  }

  loadNewsDetail(newsid,newstitle,newslink){
    //新闻详情页跳转
    this.nav.push(DetailPage,{newsid:newsid,newstitle:newstitle,newslink:newslink});
  }
  onPageScroll(event){
    //当滚动距离超过80,下拉刷新组件失效并隐藏
    if(event.target.scrollTop>80){
      this.isAtTop = false;
    }else{
      this.isAtTop = true;
    }
  }
  disableRefresh(event){
    //列表页左右滑动禁止下拉刷新
    this.isAtTop = false;
  }
}
