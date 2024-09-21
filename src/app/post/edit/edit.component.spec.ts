import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from '../post';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockPost: Post = {
    id: 1,
    title: 'Test Title',
    body: 'Test Body'
  };

  beforeEach(async () => {
    // Mock the PostService
    postService = jasmine.createSpyObj('PostService', ['find', 'update']);
    
    // Mock the Router
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Mock the ActivatedRoute to provide a postId parameter
    mockActivatedRoute = {
      snapshot: {
        params: {
          postId: 1
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule, // Use HttpClientTestingModule to mock HTTP requests
        RouterTestingModule // Use RouterTestingModule to mock routing
      ],
      providers: [
        { provide: PostService, useValue: postService }, // Provide the mocked PostService
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mocked ActivatedRoute
        { provide: Router, useValue: router } // Provide the mocked Router
      ]
    }).compileComponents();

    // Create the component instance
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch post data on ngOnInit', () => {
    // Arrange: Set the return value of PostService.find to return a mock post
    postService.find.and.returnValue(of(mockPost));

    // Act: Trigger ngOnInit
    component.ngOnInit();
    fixture.detectChanges(); // Trigger change detection

    // Assert: Ensure that postId is set and the form is initialized
    expect(component.id).toBe(1);
    expect(component.form.controls['title'].value).toBe('');
    expect(component.form.controls['body'].value).toBe('');
    expect(postService.find).toHaveBeenCalledWith(1); // Verify find method is called with the correct ID
  });

  it('should update form controls when post data is fetched', () => {
    // Arrange: Set PostService.find to return mockPost
    postService.find.and.returnValue(of(mockPost));

    // Act: Trigger ngOnInit and change detection
    component.ngOnInit();
    fixture.detectChanges(); // Update the view

    // Assert: Ensure the form controls are populated with the fetched post data
    expect(component.form.controls['title'].value).toBe(mockPost.title);
    expect(component.form.controls['body'].value).toBe(mockPost.body);
  });

  it('should display validation errors if title or body is not filled out', () => {
    // Act: Leave form controls empty and mark them as touched
    component.form.controls['title'].setValue('');
    component.form.controls['body'].setValue('');
    component.form.controls['title'].markAsTouched();
    component.form.controls['body'].markAsTouched();
    fixture.detectChanges(); // Trigger change detection

    // Find the validation error elements in the template
    const titleError = fixture.nativeElement.querySelector('.alert-danger');
    const bodyError = fixture.nativeElement.querySelector('.alert-danger');

    // Assert: Ensure the validation errors are displayed
    expect(titleError).toBeTruthy();
    expect(bodyError).toBeTruthy();
  });

  it('should call PostService.update when submit is called', () => {
    // Arrange: Mock form values and PostService.update to return a success response
    component.form.controls['title'].setValue('Updated Title');
    component.form.controls['body'].setValue('Updated Body');
    postService.update.and.returnValue(of({}));

    // Act: Call the submit method
    component.submit();
    fixture.detectChanges(); // Trigger change detection

    // Assert: Ensure PostService.update is called with the correct ID and form data
    expect(postService.update).toHaveBeenCalledWith(1, component.form.value);
    expect(router.navigateByUrl).toHaveBeenCalledWith('post/index'); // Ensure the user is redirected to post/index
  });

  it('should not call PostService.update if form is invalid', () => {
    // Arrange: Make the form invalid by not setting required fields
    component.form.controls['title'].setValue('');
    component.form.controls['body'].setValue('');

    // Act: Call the submit method
    component.submit();

    // Assert: Ensure PostService.update is not called if form is invalid
    expect(postService.update).not.toHaveBeenCalled();
  });
});
