export function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isPassword(password) {
  var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regularExpression.test(password);
}
