import { GetServerSideProps } from "next";
import { saveSession, withSsrSession } from "auth/sessionUtils";
import Button from "components/Button";
import Form from "components/Form";

// instead of creating a separate api endpoint for the contact page,
// we can actually post to gSSP. The drawback to this is that nextjs
// won't populate `req.body` in gSSP, but our withSsrSession wrapper
// does.
export const getServerSideProps: GetServerSideProps = withSsrSession(
  async ({ req, res }) => {
    if (req.method === "POST") {
      // TODO: typescript-ify this
      console.log(req["body"]);
      return { props: { submitted: true } };
    }

    // resets the CSRF token for this page since it contains a form
    await saveSession(req, res);
    return { props: {} };
  }
);

export default function ContactPage({ submitted }) {
  if (submitted)
    return (
      <>
        <p>Thank you for contacting us! We'll get back with you shortly.</p>
        <p>
          Actually, we won't because this is all a fake demo.{" "}
          <span role="img" aria-label="shrug">
            🤷
          </span>
        </p>
      </>
    );

  return (
    <div className="grid place-items-center h-full">
      <Form method="POST">
        <fieldset className="bg-blue-50 flex flex-col gap-2 border border-solid rounded p-4">
          <legend className="ml-2 px-1">Contact Us</legend>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block rounded"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="block rounded"
            />
          </div>

          <div>
            <Button>Contact Us</Button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
