export function getFriendlyErrorMessage(error) {
  switch (error.code) {
    // Email/Password sign-in errors
    case "auth/wrong-password":
      return "Password is incorrect.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/email-already-in-use":
      return "Email already in use. Please try another email.";
    case "auth/invalid-email":
      return "Invalid email address. Please check your email address and try again.";
    case "auth/invalid-code":
      return "Invalid OTP code. Please try again.";
    case "auth/expired-action-code":
    case "auth/invalid-action-code":
      return "The password reset link is invalid or has expired. Please request a new link.";

    // Google sign-in errors
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Please try signing in with a different method.";
    case "auth/invalid-credential":
      return "The provided credential is invalid. Please try again.";
    case "auth/network-request-failed":
    case "auth/web-storage-unsupported":
    case "auth/popup-closed-by-user":
      return "A network error occurred. Please check your internet connection and try again.";

    // Twitter sign-in errors
    case "auth/invalid-credentials":
      return "The provided Twitter credentials are invalid. Please try again.";

    // Facebook sign-in errors
    case "auth/network-request-failed":
      return "A network error occurred. Please check your internet connection and try again.";

    // Default error message
    default:
      return "An error occurred. Please try again.";
  }
}
