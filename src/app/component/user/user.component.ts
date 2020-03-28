import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { GetTweetsService } from "src/app/service/get-tweets.service";
import { ActivatedRoute } from "@angular/router";
import { mapApiResponse } from "../../utility/utils";
import { ITweet } from "src/app/interface";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent implements OnInit, OnDestroy {
  tweets: ITweet[] = [];
  searchTerm: string;
  pagesArray = [1];
  currentPageNumber: number;
  currentPage = "User";
  isActive: boolean;
  currentPath = "./user";
  isLoading: boolean;

  paramSub: Subscription;
  apiSub: Subscription;

  constructor(
    private getTweetsService: GetTweetsService,
    private route: ActivatedRoute
  ) {}

  // Listen for route changes if any, and set current values accordingly
  ngOnInit() {
    this.paramSub = this.route.firstChild?.params.subscribe((p) => {
      this.searchTerm = p.searchTerm;
      this.currentPageNumber = p.pageNumber;
    });
  }

  getTweets = (term) => {
    this.isLoading = true;
    this.apiSub = mapApiResponse(
      this.getTweetsService.getByUser(term)
    ).subscribe((tweets) => {
      this.tweets = tweets;
      this.setPagesArray(tweets.length);
      this.setSearchTerm(term);
      this.isLoading = false;
    });
  };

  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  // Create pagination based on number of tweets
  setPagesArray = (count: number) => {
    const pages = Math.floor(count / 10) + (count % 10 > 0 ? 1 : 0);
    this.pagesArray = [...Array(pages).keys()].map((i) => i + 1);
  };

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    if (this.apiSub) {
      this.apiSub.unsubscribe();
    }
  }
}
