import { IScopeChild } from "./types";
import { equal } from "./utils";

export class FieldContext implements IScopeChild {

  private _initialValue: any;

  public value: any;
  public error: string | null = null;
  public touched: boolean = false;

  constructor(initialValue?: any) {
    this._initialValue = initialValue;

    if (initialValue && typeof initialValue === "object") {
      this.value = (Array.isArray(initialValue) ? initialValue.slice(0) : { ...initialValue });
    } else {
      this.value = initialValue;
    }
  }

  /**
   * Returns true if the field does not have an error.
   */
  public get valid(): boolean {
    return !this.error;
  }

  /**
   * Returns true if the value for the field has changed.
   */
  public get changed(): boolean {
    return !equal(this._initialValue, this.value);
  }

  /**
   * Resets the value for the current field back to its initial value.
   */
  public reset() {
    this.value = this._initialValue;
  }

  /**
   * Clears the value for the current field.
   */
  public clear() {
    this.value = null;
  }

  /**
   * Replaces the `initialValue` of the field with the current `value`.
   */
  public commit() {
    this._initialValue = this.value;
  }

}