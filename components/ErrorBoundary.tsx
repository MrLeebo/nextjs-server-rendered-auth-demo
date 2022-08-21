import { memo } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ErrorBoundary(props) {
  const router = useRouter();
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      {...props}
      resetKeys={[router.pathname]}
    />
  );
}

export default memo(ErrorBoundary);
