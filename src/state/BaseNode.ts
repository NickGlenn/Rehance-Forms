import { INode } from "./INode";
import { RootNode } from "./RootNode";
import { EventBus } from "../EventBus";
import { randomRange } from "../utils";

/**
 * An abstract class that acts as a root for all other node types, implementing the key methods
 * and properties that persist between the different types.
 */
export abstract class NodeBase<Value> implements INode<Value> {

  /**
   * The root node of the state trie that this node belongs to.
   */
  protected _root: RootNode;

  /**
   * The direct ancestor that this node belongs to.
   */
  protected _parent: null | NodeBase<unknown>;

  /**
   * The event bus shared by all nodes within the current trie.
   */
  protected _events: EventBus;

  /**
   * A unique ID generated for this node.
   */
  protected _id: string;

  /**
   * The initial value given when the node was created.
   */
  protected _initialValue: Value;

  /**
   * Sets up the base node with the parent and root nodes, stores a reference to
   * the shared event bus and generates a unique ID for the node.
   */
  constructor(parent: null | NodeBase<unknown>, initialValue: Value) {

    // Generate and set the unique ID for the node.
    const id = randomRange(100000000, 999999999);
    this._id = (parent ? `${parent._id}.${id}` : `${id}`);

    // Store the initial value that was provided.
    this._initialValue = initialValue;

    // Store references for the ancestor nodes and event bus.
    if (parent) {
      this._parent = parent;
      this._root = parent._root;
      this._events = parent._events;
    } else {
      this._parent = null;
      this._events = new EventBus();
    }

  }
}