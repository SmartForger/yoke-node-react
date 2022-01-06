import { Formik, Form, Field, ErrorMessage } from "formik";
import account from "../services/account";
import * as Yup from "yup";

const AccountSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid format").required("Email is required"),
  balance: Yup.number()
    .positive("Balance should be a positive number")
    .required("Balance is required"),
});

export const EditAccount = () => {
  const user = account.getUser();

  return (
    <div className="EditAccount">
      <h3>Update Account</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AccountSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="edit-account-form">
            <div className="control">
              <label htmlFor="name">Name:</label>
              <Field id="name" name="name" className="input" />
            </div>
            <ErrorMessage className="field-error" name="name" component="div" />
            <div className="control">
              <label htmlFor="email">Email:</label>
              <Field id="email" type="email" name="email" className="input" />
            </div>
            <ErrorMessage
              className="field-error"
              name="email"
              component="div"
            />
            <div className="control">
              <label htmlFor="balance">Balance:</label>
              <Field
                id="balance"
                name="balance"
                className="input"
                type="number"
              />
            </div>
            <ErrorMessage
              className="field-error"
              name="balance"
              component="div"
            />
            <div className="actions">
              <button className="button" type="submit" disabled={isSubmitting || !isValid}>
                Update
              </button>
              {user && (
                <button className="button" disabled={isSubmitting}>
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
