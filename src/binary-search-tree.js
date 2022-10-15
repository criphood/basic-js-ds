const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }


class BinarySearchTree {

  constructor() {
    this.rootTree = null;
  }

  root() {
    if (!this.rootTree) return null;
    // this.rootTree.data = this.rootTree.data;
    return this.rootTree;
  }

  add(data) {
    this.rootTree = addWithin(this.rootTree, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.rootTree, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  find(data) {
    return searchWithin(this.rootTree, data);

    function searchWithin(node, data) {
      if (!node) return null;

      if (node.data === data) return node;

      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) return undefined;

    while (this.rootTree.left) this.rootTree = this.rootTree.left;

    return this.rootTree.data;
  }

  max() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }

    return +node.data;
  }
}

let tree = new BinarySearchTree();

tree.add(9);
tree.add(14);
tree.add(123131);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(8534);
tree.add(54);
tree.add(1);
tree.remove(8);
tree.remove(9);

console.log(tree.max())
console.log(tree);


// console.log(tree);

module.exports = {
  BinarySearchTree
};