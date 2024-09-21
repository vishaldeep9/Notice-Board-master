import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from '../post';
import { By } from '@angular/platform-browser';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let mockActivatedRoute: any;

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post'
  };

  beforeEach(async () => {
    // Create a mock PostService and mock ActivatedRoute with the postId parameter
    postService = jasmine.createSpyObj('PostService', ['find']);
    mockActivatedRoute = {
      snapshot: {
        params: {
          postId: 1
        }
      }
    };

    // Setup the test bed
    await TestBed.configureTestingModule({
      declarations: [ViewComponent],
      imports: [RouterTestingModule], // Import RouterTestingModule to simulate routing
      providers: [
        { provide: PostService, useValue: postService }, // Provide the mocked PostService
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Provide the mocked ActivatedRoute
      ]
    }).compileComponents();

    // Create the component fixture and initialize component instance
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Ensure the component is created successfully
  });

  it('should get postId from route params and call find method of PostService', () => {
    // Mock the PostService to return mockPost when find is called
    postService.find.and.returnValue(of(mockPost));

    // Trigger the ngOnInit lifecycle method to load the component
    component.ngOnInit();
    fixture.detectChanges(); // Trigger Angular's change detection to update the view

    // Assert that the postId is set correctly and that PostService.find was called with the correct id
    expect(component.id).toBe(1);
    expect(postService.find).toHaveBeenCalledWith(1);
  });

  it('should render the post data after fetching from PostService', () => {
    // Set PostService.find to return mockPost
    postService.find.and.returnValue(of(mockPost));

    // Trigger the ngOnInit lifecycle hook
    component.ngOnInit();
    fixture.detectChanges(); // Update the view

    // Assert that the static HTML elements for post details (ID, Title, Body) exist
    const idElement = fixture.debugElement.query(By.css('div strong:nth-child(1)')).nativeElement;
    const titleElement = fixture.debugElement.query(By.css('div strong:nth-child(2)')).nativeElement;
    const bodyElement = fixture.debugElement.query(By.css('div strong:nth-child(3)')).nativeElement;

    expect(idElement.textContent).toContain('ID:'); // Check that "ID" label exists
    expect(titleElement.textContent).toContain('Title:'); // Check that "Title" label exists
    expect(bodyElement.textContent).toContain('Body:'); // Check that "Body" label exists
  });

  it('should display the correct post ID, title, and body in the template', () => {
    // Set PostService.find to return mockPost
    postService.find.and.returnValue(of(mockPost));

    // Trigger the ngOnInit lifecycle hook and detect changes
    component.ngOnInit();
    fixture.detectChanges(); // Update the view

    // Fetch the post data rendered in the template
    const idElement = fixture.debugElement.query(By.css('p:nth-child(2)')).nativeElement;
    const titleElement = fixture.debugElement.query(By.css('p:nth-child(4)')).nativeElement;
    const bodyElement = fixture.debugElement.query(By.css('p:nth-child(6)')).nativeElement;

    // Assert that the post data (ID, Title, Body) is displayed correctly
    expect(idElement.textContent).toBe(mockPost.id.toString()); // Check if the ID is rendered correctly
    expect(titleElement.textContent).toBe(mockPost.title); // Check if the Title is rendered correctly
    expect(bodyElement.textContent).toBe(mockPost.body); // Check if the Body is rendered correctly
  });
});
