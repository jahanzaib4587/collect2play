export function getFriendlyErrorMessage(error) {
  switch (error.code) {
    case "auth/wrong-password":
      return "Password is incorrect.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/email-already-in-use":
      return "Email already in use. Please try another email.";
    case "auth/user-not-found":
      return "User not found. Please check your email address and try again.";
    case "auth/invalid-email":
      return "Invalid email address. Please check your email address and try again.";
    case "auth/expired-action-code":
      return "The password reset link has expired. Please request a new link.";
    case "auth/invalid-action-code":
      return "The password reset link is invalid. Please request a new link.";
    // Add more cases for other error codes as needed
    default:
      return "An error occurred. Please try again.";
  }
}
