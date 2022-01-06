import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const AccountSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid format").required("Email is required"),
  balance: Yup.number()
    .positive("Balance should be a positive number")
    .required("Balance is required"),
});

export const EditAccount = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const intialValues = useMemo(() => {
    return (
      user || {
        name: "",
        email: "",
        balance: "",
      }
    );
  }, [user]);

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    setSubmitting(true);
    if (!values.id) {
      await api.addUser(values);
    } else {
      await api.updateUser(values);
    }
    navigate("/account");
  };

  const handleCancel = () => {
    navigate("/account");
  };

  return (
    <div className="EditAccount">
      <h3>Update Account</h3>
      <Formik
        initialValues={intialValues}
        validationSchema={AccountSchema}
        onSubmit={handleSubmit}
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
              <button
                className="button"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {user ? "Update" : "Create"}
              </button>
              {user && (
                <button
                  className="button"
                  disabled={isSubmitting}
                  onClick={handleCancel}
                >
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
