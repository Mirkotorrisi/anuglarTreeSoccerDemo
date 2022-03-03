import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import MATCHES from "../../assets/matches.json";
@Component({
  selector: "match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute) {}
  match: any;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(MATCHES.find(({ matchId }) => matchId == params["matchId"]));
      this.match = MATCHES.find(({ matchId }) => matchId == params["matchId"]);
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
