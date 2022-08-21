import { createContext, useContext } from "react";
import { AuthenticationError, AuthorizationError, User } from "auth/session";

export const CurrentUserContext = createContext<User>(null);

// Helper hooks for user sessions.

export function useOptionalUser(): User {
  return useContext(CurrentUserContext);
}

export function useAuthenticatedUser(): User {
  const user = useOptionalUser();

  if (!user || user.role === "guest")
    throw new AuthenticationError("You must be logged in to be here.");

  return user;
}

export function useAdminUser(): User {
  const admin = useAuthenticatedUser();

  if (admin?.role !== "admin")
    throw new AuthorizationError("You must be an admin to be here.");

  return admin;
}
