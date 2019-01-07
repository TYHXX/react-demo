// import * as Sentry from "@sentry/browser";
import { toast } from "react-toastify";

function init() {
  // Sentry.init({
  //   dsn: "https://b60cd09e6536470cac915b2687b875a7@sentry.io/1361363"
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log("Logging the error", error);
  toast.error("An unexpected error occurred!");
}

export default {
  init,
  log
};
