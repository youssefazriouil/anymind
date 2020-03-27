import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./component/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "hashtag", component: DashboardComponent },
      { path: "user", component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
