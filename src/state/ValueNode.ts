import { BaseNode } from "./BaseNode";

/**
 * A value node is a node that simply contains ANY value and conforms to the
 * the same requirements of all other node types.
 */
export class ValueNode<Value = any> extends BaseNode<Value> {

  /**
   * The stored value that the value node represents.  Altering this value does
   * not broadcast any updates.  To update the value and inform the entire trie of
   * changes, use the `update()` method.
   */
  public value: Value;

  /**
   * Sets up the initial state for the value node.
   */
  constructor(parent: null | BaseNode<unknown>, initialValue: Value) {
    super(parent, initialValue);

    this.value = initialValue;
  }

  /**
   * Updates the node value and broadcasts the change to the entire trie.
   */
  public update(value: Value): void {
    this.value = value;
    this.triggerUpdateEvent();
  }

  /**
   * Returns true if the current value and initial value are no longer referentially equal.
   */
  public get changed(): boolean {
    return (this.value !== this.initialValue);
  }

  /**
   * Returns `true` if the stored value is truthy and not `undefined`, `null`,
   * an empty string (`""`) or `false`.  Numeric values such as `0` will return
   * as `true` while `NaN` will return `false`.
   */
  public truthy(): boolean {
    return (!!this.value || (typeof this.value === "number" && this.value !== NaN));
  }

  /**
   * Returns `true` if the value is considered "empty".  Empty values are `undefined`, `null`,
   * arrays with no values (`[]`) and objects with no keys (`{}`).
   */
  public empty(): boolean {
    if (Array.isArray(this.value)) {
      return this.value.length === 0;
    }

    switch (typeof this.value) {
      case "object":
        if (!this.value) { return true; }
        return Object.keys(this.value).length === 0;
      case "undefined":
        return true;
      default:
        return false;
    }
  }

  /**
   * Ensures that a `string` value is returned.  If the value is a `number` or `boolean` value,
   * then it will be converted to the `string` equivalent, otherwise, an empty `string` value
   * will be returned.
   */
  public stringValue(): string {
    switch (typeof this.value) {
      case "string":
      case "boolean":
      case "number":
        return "" + this.value;
      default:
        return "";
    }
  }

  /**
   * Returns the value as an `array` of the specified type _only_ if the stored value is an `array`
   * to begin with.  Non-array types will result in an empty `array` being returned instead.
   */
  public listValue<ItemType = any>(): ItemType[] {
    return (Array.isArray(this.value) ? this.value : [] as ItemType[]);
  }

  /**
   * Returns the value as an `object` map where the values are of the specified type, _only_ if the
   * stored value is an `object` to begin with.  If the value is _not_ an `object`, then an empty
   * `object` will be returned instead.
   */
  public mapValue<ValueType = any>(): { [key: string]: ValueType } {
    return (!!this.value && typeof this.value === "object" ? this.value : {});
  }

}