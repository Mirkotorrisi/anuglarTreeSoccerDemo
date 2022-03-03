import { Component, OnInit } from "@angular/core";

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import MATCHES from "../../assets/matches.json";
import { BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
interface CourseNode {
  name: string;
  matchId?: number;
  children?: CourseNode[];
}
interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
  matchId?: number;
}
@Component({
  selector: "tree-demo",
  templateUrl: "tree-demo.component.html",
  styleUrls: ["tree-demo.component.scss"],
})
export class TreeDemoComponent implements OnInit {
  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );
  matches: any[] = MATCHES;

  filterString = new FormControl("");

  treeFlattener = new MatTreeFlattener(
    (node: CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        matchId: node.matchId,
        expandable: node.children?.length > 0,
        level,
      };
    },
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  flatDataSource = new MatTreeFlatDataSource(
    this.flatTreeControl,
    this.treeFlattener
  );

  originalData$ = new BehaviorSubject<any[]>(this._initMatchesForTree(MATCHES));

  ngOnInit() {
    this.originalData$.subscribe(
      (value: CourseNode[]) => (this.flatDataSource.data = value)
    );
    this.filterString.valueChanges.subscribe((value) => {
      const matchesForTree = this._initMatchesForTree(this._filter(value));
      this.originalData$.next(matchesForTree);
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return filterValue
      ? MATCHES.filter(
          ({ awayName, homeName }) =>
            awayName.toLowerCase().includes(filterValue.toLowerCase()) ||
            homeName.toLowerCase().includes(filterValue.toLowerCase())
        )
      : MATCHES;
  }

  private _initMatchesForTree(data) {
    const groupedItems = data.reduce(
      (
        acc,
        { sportName, categoryName, tournamentName, homeName, awayName, matchId }
      ) => {
        return {
          ...acc,
          [sportName]: {
            ...(acc[sportName] ? acc[sportName] : {}),
            [categoryName]: {
              ...(acc[sportName] ? acc[sportName][categoryName] : {}),
              [tournamentName]: [
                ...((acc[sportName] &&
                  acc[sportName][categoryName] &&
                  acc[sportName][categoryName][tournamentName]) ||
                  []),
                { name: `${homeName} - ${awayName}`, matchId },
              ],
            },
          },
        };
      },
      {}
    );

    return Object.keys(groupedItems).map((sportName) => ({
      name: sportName,
      children: Object.keys(groupedItems[sportName]).map((categoryName) => ({
        name: categoryName,
        children: Object.keys(groupedItems[sportName][categoryName]).map(
          (tournamentName) => ({
            name: tournamentName,
            children: groupedItems[sportName][categoryName][tournamentName],
          })
        ),
      })),
    }));
  }

  hasNestedChild(index: number, node: CourseNode) {
    return node?.children?.length > 0;
  }

  hasFlatChild(index: number, node: CourseFlatNode) {
    return node.expandable;
  }
}
