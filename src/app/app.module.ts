import { ReactiveFormsModule } from "@angular/forms";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TreeDemoComponent } from "./tree-demo/tree-demo.component";
import { MatTreeModule } from "@angular/material/tree";
import { MatchComponent } from "./match/match.component";

@NgModule({
  declarations: [AppComponent, TreeDemoComponent, MatchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTreeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
