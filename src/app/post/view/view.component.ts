import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostUtilityService } from '../post-utility.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  public id = 1;
  public title = '';
  public body = '';

  userData: Post = {
    id: this.id,
    title: this.title,
    body: this.body,
  };

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private utilityService:PostUtilityService
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    console.log(this.id);
    this.postService.find(this.id).subscribe((data: Post) => {
      this.userData = data;
    });
  }
  formatPostId(id: number): string {
    return this.utilityService.formatPostId(id);
  }
}
