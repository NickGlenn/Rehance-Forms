import { RootNode } from "./RootNode";
import { TrieNode } from "./TrieNode";
import { CollectionNode } from "./CollectionNode";

/**
 * This is the interface that any state management node of Rehance Forms implements.
 */
export interface INode<Value> {

  /**
   * Unique ID that pertains only to this node.
   */
  readonly id: string;

  /**
   * The root node of the state trie that this node belongs to.
   */
  readonly root: null | RootNode;

  /**
   * The direct ancestor that this node belongs to.
   */
  readonly parent: null | TrieNode | CollectionNode | RootNode;

  /**
   * The current value for the node.  Altering this directly does not trigger
   * any updates in the form.
   */
  readonly value: Value;

}