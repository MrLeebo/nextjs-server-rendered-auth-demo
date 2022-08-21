export function findUserByCredentials(username: string, password: string) {
  // this is where an actual database would go, but for the
  // purposes of this demonstration we can just fake it.
  return {
    username,
    role: username === "admin" ? "admin" : "user"
  } as const;
}
