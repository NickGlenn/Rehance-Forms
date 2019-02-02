import { TrieNode } from "./TrieNode";

/**
 * The root node is a special node that represents the top level scope of the form.
 */
export class RootNode<Value extends object = any> extends TrieNode<Value> {

  /**
   * Set up the root node.
   */
  constructor(initialValue: Value) {
    super(null, initialValue);

    // The root node for the root node is just itself.
    this._root = this;
  }

}