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
  {
    path: "**",
    redirectTo: "hashtag",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
