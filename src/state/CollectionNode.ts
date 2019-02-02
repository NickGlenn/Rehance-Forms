import { BaseNode } from "./BaseNode";
import { TrieNode } from "./TrieNode";

/**
 * A collection node is a list of trie nodes and maps directly to a list of
 * objects like `[{}, {}, {}]`.
 */
export class CollectionNode<Item extends object = any> extends BaseNode<Item[]> {

  /**
   * The child nodes of this node. An important note:  Modifying this value directly
   * will NOT result in updates being broadcasted to the related form hierarchy!  Make
   * sure to use the appropriate mutation methods if you want updates to be broadcasted
   * for you or trigger an update manually with `triggerUpdateEvent()`.
   */
  public children: TrieNode<Item>[];

  /**
   * Walks the collection and gathers the values of all contained nodes into
   * an array of object literals.
   */
  public get value(): Item[] {
    let output: Item[] = [];
    for (let item of this.children) {
      output.push(item.value);
    }
    return output;
  }

  /**
   * Appends a new TrieNode onto the children array using the given data and
   * triggers an update, informating the related form hierarchy.
   */
  public append(data: Item): TrieNode<Item> {
    let node = new TrieNode<Item>(this, data);
    this.children.push(node);
    this.broadcastUpdate();
    return node;
  }

}