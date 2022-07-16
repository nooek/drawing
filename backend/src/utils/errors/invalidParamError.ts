import createError from "../helpers/createError/createError";
import ErrorAttributes from "../../types/ErrorType"

export default class InvalidParamError {
  private props;

  constructor(props: ErrorAttributes) {
    this.props = props;
  }

  generate() {
    return createError(this.props, "Invalid Param")
  }
}
