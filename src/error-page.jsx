import { useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
const ErrorPageAntd = () => {
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />;
};

export default ErrorPage;
