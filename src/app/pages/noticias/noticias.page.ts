import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  news = [];

  constructor(
    private newsService: NewsService,
    private loading: LoadingService
  ) { 
    this.newsService.categoryPage = 0;
    this.traerNoticias();
  }

  ngOnInit() {
  }

  traerNoticias(){
    this.loading.show('Cargando Noticias');
    this.newsService.getTopHeadLinesCategory().subscribe((result: any) => {
      this.news = [...this.news, ...result.articles];
      this.loading.hide();
    });
  }

}
