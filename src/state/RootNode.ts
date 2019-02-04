import { TrieNode } from "./TrieNode";

/**
 * The root node is a special node that represents the top level scope of the form.
 */
export class RootNode<Value extends object = any> extends TrieNode<Value> {

}