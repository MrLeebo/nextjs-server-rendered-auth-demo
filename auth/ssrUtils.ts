import bodyParser from "body-parser";
import { promisify } from "util";

// getServerSideProps doesn't parse the request body by default
export const parseBody = promisify(bodyParser.urlencoded());
