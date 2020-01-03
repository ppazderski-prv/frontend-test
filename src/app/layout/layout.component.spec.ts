import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopBarComponent} from './components/top-bar/top-bar.component';
import { FooterComponent} from './components/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockComponent(SidenavComponent),
        MockComponent(TopBarComponent),
        MockComponent(FooterComponent),
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
