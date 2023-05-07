import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllAccountsMutation,
  useCreateNewAccountMutation,
} from "features/account/accountApiSlice";
import JSONPretty from "react-json-pretty";
import styles from "../styles/Accounts.module.css";

function Accounts() {
  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();
  const [createNewAccount, { isLoadingAccountCreation }] =
    useCreateNewAccountMutation();

  const [allAccounts, setAllAccounts] = useState();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState();
  const [showCreateAccountForm, setShowCreateAccountForm] = useState();
  const [allCurrencies, setAllCurrencies] = useState();

  const dispatch = useDispatch();

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createNewAccount().unwrap();
      debugger;
      setAllAccounts(res);
    } catch (err) {
      if (!err?.originalStatus) {
        console.log("No Server Response");
      } else if (err.originalStatus === 400 || err.data) {
        console.log(err.data);
      } else {
        console.log("IDK WHATS UP LOL");
      }
    }
  };
  useLayoutEffect(() => {
    async function fetchAllAccounts() {
      try {
        const res = await getAllAccounts().unwrap();
        debugger;
        setAllAccounts(res);
      } catch (err) {}
    }
    fetchAllAccounts();
  }, [dispatch]);

  const createAccountComponent = (
    <div style={{ justifyContent: "center", display: "flex" }}>
      {!showCreateAccountForm && (
        <div
          className={styles.createAnAccountButton}
          onClick={() => {
            setShowCreateAccountForm(true);
          }}
        >
          <h1>+</h1>
          <h5>Create an account</h5>
        </div>
      )}
      {showCreateAccountForm && (
        <div
          style={{
            border: "1px solid black",
            margin: "10px",
            textAlign: "center",
            padding: "25px",
            justifyContent: "center",
          }}
        >
          <h1
            onClick={() => {
              setShowCreateAccountForm(false);
            }}
            style={{
              border: "1px solid red",
              cursor: "pointer",
              width: "fit-content",
              userSelect: "none",
              textAlign: "center",
            }}
          >
            XX close creation XX
          </h1>
          <form onSubmit={handleCreateAccountSubmit}>
            <label for="selectCurrency">
              Select the currency of the account you want to open{" "}
            </label>
            <select
              className={styles.input}
              id="selectCurrency"
              name="selectCurrency"
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
            >
              <option value="" selected disabled>
                ...
              </option>
              {allCurrencies?.map((currency, ind) => (
                <option key={`ee${ind}`} value={currency.key}>
                  {currency.key}
                </option>
              ))}
            </select>

            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {createAccountComponent}
      <h1>Your accounts</h1>
      {allAccounts && (
        <JSONPretty id="json-pretty" data={allAccounts}></JSONPretty>
      )}
    </>
  );
}

export default Accounts;
