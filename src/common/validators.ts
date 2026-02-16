export function isValidEmail(email: string): boolean {
  const regex: RegExp =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

  return regex.test(email.trim());
}

export function isValidName(
  name: string,
  minLength: number = 1,
  maxLength: number = Infinity,
): boolean {
  if (minLength < 1 || maxLength < 1 || minLength > maxLength) {
    throw new Error(
      "Invalid length range: minLength and maxLength must be positive, and minLength must not exceed maxLength.",
    );
  }

  const trimmedName = name.trim();

  const isValidLength =
    trimmedName.length >= minLength && trimmedName.length <= maxLength;

  const nameRegex = /^[a-zA-Z\s'.-]+$/;
  const isValidFormat = nameRegex.test(trimmedName);

  return isValidLength && isValidFormat;
}
