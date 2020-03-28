import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { HashtagComponent } from "./component/hashtag/hashtag.component";
import { UserComponent } from "./component/user/user.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "hashtag",
    pathMatch: "full",
  },
  {
    path: "hashtag",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "page/1",
        pathMatch: "full",
      },
      {
        path: "page/:page",
        data: { test: "ja" },
        component: DashboardComponent,
      },
    ],
  },
  {
    path: "user",
    component: DashboardComponent,
    data: {
      currentPage: "user",
      currentPageNumber: 1,
    },
    children: [
      {
        path: "page/:page",
        component: DashboardComponent,
      },
    ],
  },
];

const routes2 = [
  {
    path: "",
    redirectTo: "hashtag",
    pathMatch: "full",
  },
  {
    path: "hashtag",
    component: HashtagComponent,
    children: [
      {
        path: "search/:searchTerm",
        redirectTo: "search/:searchTerm/page/1",
      },
      {
        path: "search/:searchTerm/page/:pageNumber",
        component: HashtagComponent,
      },
    ],
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "search/:searchTerm",
        redirectTo: "search/:searchTerm/page/1",
      },
      {
        path: "search/:searchTerm/page/:pageNumber",
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes2)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
