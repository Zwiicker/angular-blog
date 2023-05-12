import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {dataFake} from 'data/dataFake'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  photoCover:string = ""
  contentTitle:string = ""
  contentDescription:string = ""
  estreia:string = ""
  videoUrl: SafeResourceUrl = ''
  private id:string | null = "0"


  constructor(
    private route:ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
     this.id = value.get("id")
    )

    this.setValuesToComponent(this.id)
  }

  setValuesToComponent(id:string | null){
    const result = dataFake.filter(article => article.id == id)[0]

    const youtubeVideoUrl = `https://www.youtube.com/watch?v=${result.videoUrl}`;

    this.contentTitle = result.title
    this.contentDescription = result.description
    this.photoCover = result.photoCover
    this.estreia = result.estreia
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeVideoUrl);

  }

}
