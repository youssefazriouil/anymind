import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GetTweetsService } from "src/app/service/get-tweets.service";
import { ActivatedRoute } from "@angular/router";
import { mapApiResponse } from "../../utility/utils";
import { finalize } from "rxjs/operators";
import { ITweet } from "src/app/interface";
@Component({
  selector: "app-hashtag",
  templateUrl: "./hashtag.component.html",
})
export class HashtagComponent implements OnInit {
  tweets: ITweet[] = [];
  searchTerm: string;
  pagesArray = [1];
  currentPageNumber: number;
  currentPage = "Hashtag";
  isActive: boolean;
  currentPath = "./hashtag";
  isLoading: boolean;

  constructor(
    private getTweetsService: GetTweetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.firstChild?.params.subscribe((p) => {
      this.searchTerm = p.searchTerm;
      this.currentPageNumber = p.pageNumber;
    });
  }

  getTweets = (term) => {
    this.isLoading = true;
    mapApiResponse(this.getTweetsService.getByHashTag(term)).subscribe(
      (tweets) => {
        this.tweets = tweets;
        this.setPagesArray(tweets.length);
        this.setSearchTerm(term);
        this.isLoading = false;
      }
    );
  };

  setTweets = (tweets) => {
    this.tweets = tweets;
  };

  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  setPagesArray = (count: number) => {
    const pages = Math.floor(count / 10) + (count % 10 > 0 ? 1 : 0);
    this.pagesArray = [...Array(pages).keys()].map((i) => i + 1);
  };
}
