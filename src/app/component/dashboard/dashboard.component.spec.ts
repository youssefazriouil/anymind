import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const router = {
    navigate: jasmine.createSpy("navigate"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("onsubmit to call router", () => {
    component.currentPath = "hashtag";
    component.onSubmit("term");
    expect(router.navigate).toHaveBeenCalledWith(["hashtag", "search", "term"]);
  });

  it("toggleScreen to call router", () => {
    component.toggleScreen("User");
    expect(router.navigate).toHaveBeenCalledWith(["user"]);
  });
});
