console.clear();

type TreeType = 'left' | 'right';

class Tree {
  parent: Tree | null = null;
  value: number;
  left: Tree | null = null;
  right: Tree | null = null;
  level: number = 0;
  root: Tree;

  private indent = '  ';
  constructor(value: number, parent?: Tree) {
    this.parent = parent || null;
    this.value = value;
    this.level = this.parent ? this.parent.level + 1 : 0;
    this.root = parent ? parent.root : this;
  }

  private getChildByType = (childType: TreeType) => {
    return this[childType];
  };

  private updateChild = (value: number, childType: TreeType) => {
    const child = this.getChildByType(childType);

    if (!child) {
      const newChild = new Tree(value, this);
      return (this[childType] = newChild);
    } else {
      child.addValue(value);
    }
  };

  addValue(value: number) {
    const childType = value < this.value ? 'left' : 'right';
    this.updateChild(value, childType);

    return this.root;
  }

  private getFormattedValue = () => {
    const prefix = this.parent ? '└─' : '';
    const indent = this.indent.repeat(Math.max(0, this.level - 1));
    return `${indent}${prefix}${String(this.value).padStart(2, '0')}`;
  };

  // └─
  // ├─

  print = () => {
    const title = this.getFormattedValue();
    console.log(title);
    if (this.left) {
      this.left.print();
    }
    if (this.right) {
      this.right.print();
    }
  };

  private getSortedValues = (tree: Tree | undefined | null): number[] => {
    if (!this.value) {
      return [];
    }

    const left = this.left?.getSortedValues(this?.left) || [];

    const right = this.right?.getSortedValues(this?.right) || [];

    return [...left, this.value, ...right];
  };

  private getValuesStringified = () => {
    return this.getSortedValues(this).join(', ');
  };

  printSorted = () => {
    console.log(this.getValuesStringified());
  };

  toString = () => {
    return this.getValuesStringified();
  };

  findValue = (value: number): Tree | null => {
    if (value === this.value) {
      return this;
    }

    const childType = value < this.value ? 'left' : 'right';
    const child = this.getChildByType(childType);

    if (!child) {
      return null;
    }

    return child.findValue(value);
  };

  private getChildType = (child: Tree): TreeType | null => {
    if (child === this.left) {
      return 'left';
    }

    if (child === this.right) {
      return 'right';
    }

    return null;
  };

  private removeChild = (child: Tree) => {
    const childType = this.getChildType(child);

    if (!childType) {
      return;
    }

    this[childType] = null;
  };

  private replaceChild = (child: Tree, newChild: Tree) => {
    const childType = this.getChildType(child);

    if (!childType) {
      return;
    }

    this[childType] = newChild;

    newChild.parent = this;
    newChild.level = this.level + 1;
  };

  #removeTree = (tree: Tree) => {
    if (!tree.left && !tree.right) {
      tree.parent?.removeChild(tree);

      return null;
    }

    if (tree.left && tree.right) {
      const rightMin = tree.right.getMinTree();
      rightMin.parent?.removeChild(rightMin);

      tree.parent?.replaceChild(tree, rightMin);

      rightMin.left = tree.left;
      rightMin.right = tree.right;

      return rightMin;
    }

    const child = tree.left || tree.right;

    if (child) {
      tree.parent?.replaceChild(tree, child);

      return child;
    }

    return null;
  };

  removeValue = (value: number) => {
    const tree = this.findValue(value);

    if (!tree) {
      return null;
    }

    return this.#removeTree(tree);
  };

  getMinTree = (): Tree => {
    if (this.left) {
      return this.left.getMinTree();
    }

    return this;
  };

  getMinValue = () => {
    return this.getMinTree();
  };

  getMaxTree = (): Tree => {
    if (this.right) {
      return this.right?.getMaxTree();
    }

    return this;
  };

  getMaxValue = () => {
    return this.getMaxTree();
  };

  get children() {
    return [this.left?.value, this.right?.value].filter(Boolean);
  }

  qwe = () => {
    const queue = [this.root];

    const result: number[] = [];

    while (queue.length) {
      const current = queue.shift();

      if (current) {
        result.push(current.value);
      }
      if (current?.left) {
        queue.push(current.left);
      }
      if (current?.right) {
        queue.push(current.right);
      }
    }

    // return result;

    console.log(result.join(', '));
  };

  static fromArray = (values: number[], parent?: Tree): Tree => {
    if (!values.length) {
      throw new Error('Values array is empty');
    }

    const mid = Math.floor(values.length / 2);

    const tree = new Tree(values[mid], parent);

    const left = values.slice(0, mid);

    const right = values.slice(mid + 1);

    tree.left = left.length ? Tree.fromArray(left, tree) : null;
    tree.right = right.length ? Tree.fromArray(right, tree) : null;

    return tree;
  };

  // printPaths2 = () => {
  //   const queue = [this.root];

  //   while (queue.length) {
  //     const current = queue.shift();

  //     if (current) {
  //       console.log(current.value);
  //     }

  //     if (current?.left) {
  //       queue.push(current.left);
  //     }

  //     if (current?.right) {
  //       queue.push(current.right);
  //     }
  //   }
  // }

  pp = () => {
    const queue = [this.root];
    const currentPath: number[] = [];

    while (queue.length) {
      const current = queue.pop();

      if (current) {
        currentPath.push(current.value);
      }

      console.log(currentPath);
    }
  };

  printPaths = (paths: number[] = []): number[] => {
    if (!this.left && !this.right) {
      return [...paths, this.value];
    }

    const left = this.left?.printPaths([...paths, this.value]) || [];
    const right = this.right?.printPaths([...paths, this.value]) || [];

    return [...left, ...right];
  };


  pr2 = () => {
    const res = [];
  }
}

// const tree = new Tree(10)
//   .addValue(5)
//   .addValue(17)
//   .addValue(8)
//   .addValue(6)
//   .addValue(25)
//   .addValue(4)
//   .addValue(3)
//   .addValue(99)
//   .addValue(9);

console.log('======================');
console.log('======================');
console.log('======================');

const sortedTree = Tree.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

sortedTree.print();
sortedTree.printSorted();

const paths = sortedTree.printPaths();
console.log('paths: ', paths);
