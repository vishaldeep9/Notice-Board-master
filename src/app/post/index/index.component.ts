import { PostUtilityService } from './../post-utility.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  public mm: number = 0;
  public ss: number = 0;
  public formattedString: string = 'MM:SS';
  public welcomeMessage: string = '';

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private utilityService: PostUtilityService
  ) {
    const value = 'hello world bro';
    const words = value.split(/[\s_]+/);
    console.log(words);
    console.log(words[0]);
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
    this.forTimer();
    this.wishMessage();
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.delete(id).subscribe((res) => {
        this.posts = this.posts.filter((item) => item.id !== id);
        console.log('Post deleted successfully!');
      });
    } else {
      console.log('Deletion canceled by user.');
    }
  }

  forTimer() {
    setInterval(() => {
      this.ss++;
      if (this.ss == 60) {
        this.mm++;
        this.ss = 0;
      }
      this.formattedString = this.formatTime(this.mm, this.ss);
    }, 1000);
  }
  formatTime(mm: number, ss: number): string {
    const minute = mm < 10 ? '0' + mm : mm;
    const second = ss < 10 ? '0' + ss : ss;

    return `${minute}:${second}`;
  }
  wishMessage() {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      this.welcomeMessage = 'Good Morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      this.welcomeMessage = 'Good Afternoon';
    } else {
      this.welcomeMessage = 'Good Evening';
    }
  }
  formatPostId(id: number): string {
    return this.utilityService.formatPostId(id);
  }
}
