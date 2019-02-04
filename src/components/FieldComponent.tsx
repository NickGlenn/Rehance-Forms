import * as React from "react";
import { ScopeContext } from "../ScopeContext";
import { Subscriber } from "../Subscriber";
import { FormEvent } from "../EventBus";

export type FieldComponentProps = {
  /** The name of the field. */
  name: string;
};

type Props<CustomProps> = FieldComponentProps & CustomProps;


class FieldProxy extends React.Component { }


/**
 * This component is a base for custom, Rehance-Form compatible components.
 */
export abstract class FieldComponent<ValueType = any, CustomProps extends object = any, State extends object = any> extends React.Component<Props<CustomProps>, State> {

  /**
   * The current scope that this component is declared under.
   */
  protected form: null | ScopeContext = null;

  /**
   * Invoked whenever a form event has been triggered, should return true if the form event
   * should cause a re-render of the field component.  By default, this will return true if:
   *
   * 1. The event is a form-level update.
   * 2. The event is a field-level update and the field name matches the `name` prop value.
   */
  protected shouldFieldUpdate(form: FormEvent): boolean {
    return ();
  }

  /**
   * Called when the form scope is set for the first time.
   */
  protected formScopeMounted() { }

  /**
   * Sets the form scope for the field and renders the field contents.
   */
  private setFormScopeAndRenderFieldContents = (scope: ScopeContext) => {
    if (this.form !== scope) {
      this.form = scope;
      this.formScopeMounted();
    }

    return this.renderField();
  }

  /**
   * Renders the actual field contents for the field.
   */
  protected abstract renderField(): React.ReactNode;

  /**
   * Renders the component.
   */
  public render() {
    return (
      <Subscriber>
        {this.setFormScopeAndRenderFieldContents}
      </Subscriber>
    );
  }

}