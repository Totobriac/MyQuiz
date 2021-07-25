import { Component, OnInit } from '@angular/core';
import { s3UploadService } from './s3Upload.service';
import { SlidesGenerator } from './slides-generator.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  constructor(private slideGenerator: SlidesGenerator,
    private s3Upload: s3UploadService) { }

  ngOnInit(): void {
  }

  async generateAnswer() {
    var pic = await this.getPicture()
    console.log(pic)
    this.s3Upload.getPresignedUrl("myQuestion")
      .subscribe(r => {
        this.s3Upload.uploadFile(r["url"], pic)
          .subscribe(r => console.log("uploaded"))
      })
  }

  getPicture() {
    return this.slideGenerator.generateAnswer()
  }
}