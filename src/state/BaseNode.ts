import { RootNode } from "./RootNode";
import { EventBus } from "../EventBus";
import { randomRange } from "../utils";

/**
 * An abstract class that acts as a root for all other node types, implementing the key methods
 * and properties that persist between the different types.
 */
export abstract class BaseNode<Value> {

  /**
   * The root node of the state trie that this node belongs to.
   */
  public readonly root: RootNode;

  /**
   * The direct ancestor that this node belongs to.
   */
  public readonly parent: null | BaseNode<unknown>;

  /**
   * The event bus shared by all nodes within the current trie.
   */
  protected readonly events: EventBus;

  /**
   * A unique ID generated for this node.
   */
  public readonly id: string;

  /**
   * The initial value given when the node was created.
   */
  public readonly initialValue: Value;

  /**
   * The value(s) that the current node is maintaining or represents.
   */
  public abstract readonly value: Value;

  /**
   * Sets up the base node with the parent and root nodes, stores a reference to
   * the shared event bus and generates a unique ID for the node.
   */
  constructor(parent: null | BaseNode<unknown>, initialValue: Value) {

    // Generate and set the unique ID for the node.
    const id = randomRange(100000000, 999999999);
    this.id = (parent ? `${parent.id}.${id}` : `${id}`);

    // Store the initial value that was provided.
    this.initialValue = initialValue;

    // Store references for the ancestor nodes and event bus.
    if (parent) {
      this.parent = parent;
      this.root = parent.root;
      this.events = parent.events;
    } else {
      this.parent = null;
      this.events = new EventBus();
    }

  }

}