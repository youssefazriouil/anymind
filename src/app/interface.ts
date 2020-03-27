export interface ITweet {
  tweet: string;
  likes: number | string;
  replies: number | string;
  retweets: number | string;
  hashtags: string;
  date: string;
}
interface IResult {
  account: object;
  date: string;
  hashtags: string[];
  likes: number;
  replies: number;
  retweets: number;
  text: string;
}

export interface IAPIResponse {
  count: number;
  offset: number;
  results: IResult[];
}
