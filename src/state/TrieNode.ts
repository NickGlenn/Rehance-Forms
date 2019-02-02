import { INode } from "./INode";
import { BaseNode } from "./BaseNode";

/**
 * Represents the underlying data structure for a node map.
 */
export type NodeMap<Source extends object> = {
  [key in keyof Source]: INode<Source[key]>;
};

/**
 * A trie node represents an object, where various keys may represent value,
 * collection or other trie nodes.
 */
export class TrieNode<Source extends object = object> extends BaseNode<Source> {

  /**
   * The child nodes of this node. An important note:  Modifying this value directly
   * will NOT result in updates being broadcasted to the related form hierarchy!  Make
   * sure to use the appropriate mutation methods if you want updates to be broadcasted
   * for you or trigger an update manually with `triggerUpdateEvent()`.
   */
  public children: NodeMap<Source>;

  /**
   * Sets up the trie with the proper hierarchy and initial values.
   */
  constructor(parent: null | BaseNode<unknown>, initialValue: Source) {
    super(parent, initialValue);
  }

}