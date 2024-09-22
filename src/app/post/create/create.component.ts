import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  id?: number;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
    this.catchIdAndGetData();
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    console.log(this.form);
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('post/index');
    });
  }
  updateForm() {
    if (this.id) {
      this.postService
        .update(this.id, this.form.value)
        .subscribe((res: any) => {
          alert(`Post Update Successfully...`)
          this.router.navigateByUrl('post/index');
        });
    }
  }

  catchIdAndGetData() {
    this.id = this.route.snapshot.params['postId'];
    if (this.id) {
      this.postService.find(this.id).subscribe((data: Post) => {
        this.form.patchValue(data);
      });
    }
  }
}
