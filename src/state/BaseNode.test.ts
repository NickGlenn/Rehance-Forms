import { BaseNode } from "./BaseNode";

class TestNode extends BaseNode<string> {
  public value: string;
}

describe("BaseNode", () => {

  it("constructs a new EventBus instance when no parent is given");

  it("sets the parent, along with the parent's root node and event bus, when a parent is provided");

  it("generates a unique ID per node instance when no parent is given");

  it("generates a unique ID with appended to the parent's ID when a parent is given");

});