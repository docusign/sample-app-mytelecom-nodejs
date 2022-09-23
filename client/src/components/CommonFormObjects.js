import text from "../assets/Text.json";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formCheckFieldRequired = {
  value: true,
  message: text.formLabels.requiredFieldError,
};
const formCheckNameMaxLength = {
  value: 50,
  message: text.formLabels.inputTooLongError,
};

export { emailRegExp, formCheckFieldRequired, formCheckNameMaxLength };
