import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { GetTweetsService } from "./get-tweets.service";
import { Observable } from "rxjs";

describe("GetTweetsService", () => {
  let service: GetTweetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GetTweetsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
