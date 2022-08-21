import Cookie from "js-cookie";

/*
 * You might need to use this hook if you're making an AJAX request
 * to an endpoint that requires CSRF. Otherwise, you might want to
 * use the <Form> component instead.
 */
export default function useCsrfToken() {
  return Cookie.get("__csrf");
}
