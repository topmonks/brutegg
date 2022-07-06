import PropTypes from "prop-types";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.any,
  }),
  resetErrorBoundary: PropTypes.func,
};
