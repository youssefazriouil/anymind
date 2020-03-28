import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ChangeDetectionStrategy,
} from "@angular/core";
import { formatDate } from "@angular/common";
import {
  map,
  finalize,
  take,
  publishReplay,
  refCount,
  filter,
  takeUntil,
  isEmpty,
} from "rxjs/operators";

import testData from "../../service/testData";
import { ITweet } from "../../interface";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() currentPage;
  @Input() currentPageNumber;
  @Input() tweets: ITweet[];
  @Output() getTweets = new EventEmitter<string>();
  @Input() searchTerm: string;
  @Input() pagesArray: number[];
  @Input() currentPath: string;
  @Input() isLoading: boolean;

  isHashtag: boolean;
  searchInput = new FormControl("");

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isHashtag = this.currentPage === "Hashtag";
    this.searchInput.setValue(this.searchTerm);

    if (!this.currentPageNumber) {
      this.currentPageNumber = 1;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentPage = changes.currentPage?.currentValue || this.currentPage;
    this.currentPageNumber =
      changes.currentPageNumber?.currentValue || this.currentPageNumber;
    this.tweets = changes.tweets?.currentValue || this.tweets;
    this.searchTerm = changes.searchTerm?.currentValue || this.searchTerm;
    this.pagesArray = changes.pagesArray?.currentValue || this.pagesArray;
    this.currentPath = changes.currentPath?.currentValue || this.currentPath;
    this.isLoading = changes.isLoading?.currentValue || this.isLoading;
  }

  onSubmit = (term): void => {
    if (term) {
      this.isLoading = true;
      this.getTweets.emit(term);
      this.router.navigate([this.currentPath, "search", term]);
    }
  };

  toggleScreen = (screen): void => {
    this.router.navigate([screen.toLowerCase()]);
  };
}
