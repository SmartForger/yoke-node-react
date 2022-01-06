import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Account = () => {
  const { user, refreshUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <div className="Account">
      <h3>Account</h3>
      <div className="account-form">
        <div className="control">
          <div className="label">Name:</div>
          <div className="value">{user?.name}</div>
        </div>
        <div className="control">
          <div className="label">Email:</div>
          <div className="value">{user?.email}</div>
        </div>
        <div className="control">
          <div className="label">Balance:</div>
          <div className="value">{user?.balance}</div>
        </div>
        <h4>Receipts</h4>
        {user?.receipts && user.receipts.length > 0 ? (
          <table className="receipts-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {user?.receipts?.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.productName}</td>
                  <td>{receipt.price}</td>
                  <td>{receipt.quantity}</td>
                  <td>{receipt.purchasedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>You have't purchased any product yet.</div>
        )}

        <div className="actions">
          <button
            className="button"
            onClick={() => {
              navigate("/account/edit");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
