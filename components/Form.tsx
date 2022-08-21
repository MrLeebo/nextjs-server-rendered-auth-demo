import { memo } from "react";
import useCsrfToken from "hooks/useCsrfToken";

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

function Form({ children, ...rest }: Props) {
  const csrfToken = useCsrfToken();

  return (
    <form {...rest}>
      <input type="hidden" name="__csrf" value={csrfToken} />
      {children}
    </form>
  );
}

export default memo(Form);
