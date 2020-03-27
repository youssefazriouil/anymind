import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import { map, finalize, take, publishReplay, refCount } from "rxjs/operators";

import testData from "../../service/testData";
import { ITweet, IAPIResponse } from "../../interface";
import { GetTweetsService } from "src/app/service/get-tweets.service";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private getTweetsService: GetTweetsService) {}
  isHashtag = true;
  isLoading = false;
  hashTagTweets$: Observable<ITweet[]>;
  UserTweets: ITweet[];

  ngOnInit(): void {
    this.hashTagTweets$ = of(this.mapResponse(testData));
  }

  onSubmit = (term) => {
    if (term) {
      this.isLoading = true;

      this.hashTagTweets$ = this.getTweetsService.getByHashTag(term).pipe(
        take(1),
        map((res: IAPIResponse) => this.mapResponse(res)),
        finalize(() => (this.isLoading = false))
      );
    }
  };

  truncateTweet = (text: string): string => {
    return text.length > 50 ? text.substring(0, 50) + "…" : text;
  };

  getHashTags = (hashtags: string[]): string => {
    return hashtags.length > 0 ? hashtags.slice(0, 2).join(", ") : "-";
  };

  mapResponse = (data: IAPIResponse): ITweet[] => {
    return data.results.map((tweet) => {
      return {
        tweet: this.truncateTweet(tweet.text),
        likes: tweet.likes || "-",
        replies: tweet.replies || "-",
        retweets: tweet.retweets || "-",
        hashtags: this.getHashTags(tweet.hashtags),
        date: formatDate(tweet.date, "mediumDate", "en-US"),
      };
    });
  };

  toggleScreen = (screen) => {
    this.isHashtag = screen === "hashtag";
  };
}
