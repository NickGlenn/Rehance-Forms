# Rehance-Forms

This library aims to ease the pain of creating forms in React.  It offers tools for handling validation and interaction states for both single fields or entire forms.  It supports native `<input>`, but can easily be used with custom components.

## Getting Started

Install via `npm`:

```bash
npm i -S rehance-forms
```

## Quick Start

```tsx
import * as React from "react";
import { check, email, password, toggle } from "rehance-forms";

export class LoginForm extends React.Component {

  email = email(this).required();
  password = password(this).required();
  rememberMe = toggle(this);

  get isValid() {
    return check(
      this.email.isValid,
      this.password.isValid
    );
  }

  submitForm = () => {
    // implement form submit logic
  }

  render() {
    return (
      <div>
        <div>
          <input {...this.email.props} placeholder="Email Address" />
          <span>{this.email.error}</span>
        </div>
        <div>
          <input {...this.password.props} placeholder="Password" />
          <span>{this.password.error}</span>
        </div>
        <input {...this.rememberMe.props} />
        <button disabled={!this.isValid} onClick={this.submitForm}>
          Submit
        </button>
      </div>
    );
  }

}
```

Rather than creating a higher-order components or relying on context and render props, this library chooses to expose several classes for managing specific types of state.

### Defining Fields

If you're using Typescript or the Babel plugins for class properties, then you can simply define them like in the ["quick start" example above](#quick-start).  Otherwise, you'll need to define your fields in the `constructor()` method of your `Component` class.  If you wish to use stateless functions for your form, you can use the `form()` factory component.

```tsx
// Property Declaration
class MyForm extends React.Component {

  myField = text(this).required();

}

// Constructor Declaration
class MyForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.myField = text(this).required();
  }

}

// HoC Declaration
const MyForm = form(form => ({
  myField: text(form).required(),
}), props => {
  return (
    <input {...props.myField.props} />
  );
});
```

### The `props` Property

You may notice above that there is a `prop` property on some field types.  This property is a getter that creates all of the necessary bindings and values for an HTML component.  By using the following syntax below, the `value` is automatically provided to the `<input>` element, along with the event methods for `onFocus`, `onBlur`, and `onChange`.  This allows the field type to automatically handle the appropriate effects for interaction with the configured element or component.

```tsx
<input {...this.myField.props}>
```

### Checking Field Validity

All field types _should_ expose an `isValid` property or accessor.  The `isValid` property is used to determine the legitamacy of that single field type or its constituents.  This library also provides a `check()` method for checking the validity of multiple field types at once.  It should be noted that the higher-order component created by the `form()` utility provides an `isValid` property that contains the result of a `check()` call on its fields.

```tsx
render() {
  const isStep1Valid = check(this.fullName, this.email);
  const isStep2Valid = check(this.favFood);

  return (
    <div>
      <section className="Step-1">
        <div>
          What is your full name?
          <input {...this.fullName.props} />
        </div>
        <div>
          What is your email?
          <input {...this.email.props} />
        </div>
        <button disabled={!isStep1Valid} onClick={this.nextStep}>
          Next Step
        </button>
      </section>
      <section className="Step-2">
        <div>
          What is your favorite food?
          <input {...this.favFood.props} />
        </div>
        <button disabled={!isStep2Valid} onClick={this.nextStep}>
          Next Step
        </button>
      </section>
    </div>
  );
}
```

## The `Input` Type

Input element primarily* use the `Input` class for managing input state.

> **Note:** Not all field types that use an `<input>` element use the `Input` class.  For example, the `Toggle` type is a specialized class for managing `boolean` states on `input[type=checkbox]` elements.

### Properties

| Property      | Description                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| **value**     | The current value of the input (by state, not by element).                                                           |
| **error**     | The first error of all errors for the input.  Will be `null` if no errors are set.                                   |
| **errors**    | An array containing all of the errors for the input field.  Will be an empty array if there are currently no errors. |
| **isValid**   | Is `true` when there are no errors on the input and the input has been validated.                                    |
| **isFocused** | Is `true` when the input is currently focused or active.                                                             |
| **isDirty**   | Is `true` when the user has interacted with the input in some way.                                                   |
| **props**     | An auto-generated object containing the compatible props for an `HTMLInputElement` component.                        |

### Adding Validation Rules

TBD

## The `Toggle` Type

TBD

## The `Group` Type

TBD

## The `List` Type

TBD

## The `Collection` Type

TBD