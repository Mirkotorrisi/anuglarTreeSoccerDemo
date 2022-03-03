import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatchComponent } from "./match/match.component";
import { TreeDemoComponent } from "./tree-demo/tree-demo.component";

const routes: Routes = [
  {
    path: "",
    component: TreeDemoComponent,
  },
  {
    path: "matches/:matchId",
    component: MatchComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
