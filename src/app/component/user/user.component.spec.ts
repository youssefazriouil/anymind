import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { GetTweetsService } from "src/app/service/get-tweets.service";
import { of } from "rxjs";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const apiResult = {
    count: 10,
    offset: 0,
    results: [
      {
        account: {
          fullname: "Leonardo Luduena",
          href: "/lle0x",
          id: 951196419444142081,
        },
        date: "2020-03-24T19:47:00+07:00",
        hashtags: ["#Python", "#DevOps"],
        likes: 0,
        replies: 0,
        retweets: 0,
        text:
          "#Page 1: Python Scripting by Pranavi Pinky https://link.medium.com/Rj4ApWYd84\u00a0",
      },
    ],
  };

  const mappedTweet = {
    tweet: "#Page 1: Python Scripting by Pranavi Pinky https:/…",
    likes: "-",
    replies: "-",
    retweets: "-",
    hashtags: "#Python, #DevOps",
    date: "Mar 24, 2020",
  };

  const mockTweetsService = {
    getByUser: (term) => of(apiResult),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: GetTweetsService, useValue: mockTweetsService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("getTweets should set tweets, pagesArray and searchTerm", () => {
    component.getTweets("Python");
    expect(component.tweets).toEqual([mappedTweet]);
    expect(component.pagesArray).toEqual([1]);
    expect(component.searchTerm).toEqual("Python");
    expect(component.isLoading).toEqual(false);
  });
});
