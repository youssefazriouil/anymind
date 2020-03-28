import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

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
  lastPageNumber: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isHashtag = this.currentPage === "Hashtag";
    this.searchInput.setValue(this.searchTerm);

    if (!this.currentPageNumber) {
      this.currentPageNumber = 1;
    }
    this.lastPageNumber = this.pagesArray ? this.pagesArray.slice(-1)[0] : 1;
  }

  // listen to changes that are emitted from parent components and set bound values accordingly. If no change was found, reset old value
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

  // if term was submitted, emit change back to parent component and then navigate to the search path
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
