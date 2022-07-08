import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}
const TREE_DATA = [
  [
    {
      name: "name",
      displayName: "Name"
    },
    {
      name:"count",
      displayName: "Count"
    }
  ],
  [
    {
      name: 'Fruit',
      children: [
        {name: 'Apple', count: 10},
        {name: 'Banana', count: 20},
        {name: 'Fruit loops', count: 30},
      ]
    }, {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [
              {name: 'Broccoli', count: 10},
              {name: 'Brussel sprouts', count: 20},
            ]
          }, {
            name: 'Orange',
            children: [
              {name: 'Pumpkins', count: 30},
              {name: 'Carrots', count: 40},
            ]
          },
      ]
    }
  ]
]


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  level: number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.scss'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  displayedColumns= TREE_DATA[0].map(i=> i.name);
  columns = TREE_DATA[0];
  
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count: node.count,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, 
      node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA[1]
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  console(row:any){
    console.log(row)
  }
}

