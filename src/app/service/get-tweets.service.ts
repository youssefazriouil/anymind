import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GetTweetsService {
  constructor(private http: HttpClient) {}

  getByHashTag = (hashtag: string): Observable<object> => {
    return this.http.get(`/api/hashtags/${hashtag}?offset=0`);
  };

  getByUser = (user: string): Observable<object> => {
    return this.http.get(`/api/users/${user}?offset=0`);
  };
}
