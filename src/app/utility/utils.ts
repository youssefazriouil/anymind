import { Observable } from "rxjs";
import { IAPIResponse, ITweet } from "../interface";
import { map, take } from "rxjs/operators";
import { formatDate } from "@angular/common";

export const mapApiResponse = (obs: Observable<object>) => {
  return obs.pipe(
    map((res: IAPIResponse) => mapResponse(res)),
    take(1)
  );
};

const mapResponse = (data: IAPIResponse): ITweet[] => {
  return data.results?.map((tweet) => {
    return {
      tweet: truncateTweet(tweet.text),
      likes: tweet.likes || "-",
      replies: tweet.replies || "-",
      retweets: tweet.retweets || "-",
      hashtags: getHashTags(tweet.hashtags),
      date: formatDate(tweet.date, "mediumDate", "en-US"),
    };
  });
};

const truncateTweet = (text: string): string => {
  return text.length > 50 ? text.substring(0, 50) + "…" : text;
};

const getHashTags = (hashtags: string[]): string => {
  return hashtags.length > 0 ? hashtags.slice(0, 2).join(", ") : "-";
};
