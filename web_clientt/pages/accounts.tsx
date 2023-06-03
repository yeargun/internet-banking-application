import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllAccountsMutation,
  useCreateNewAccountMutation,
  useGetAllCurrenciesMutation,
} from "features/account/accountApiSlice";
import JSONPretty from "react-json-pretty";
import styles from "../styles/Accounts.module.css";

function Accounts() {
  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();
  const [createNewAccount, { isLoadingAccountCreation }] =
    useCreateNewAccountMutation();
  const [getAllCurrencies, { isLoadingCurrencies }] =
    useGetAllCurrenciesMutation();

  const [allAccounts, setAllAccounts] = useState();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState();
  const [showCreateAccountForm, setShowCreateAccountForm] = useState();
  const [allCurrencies, setAllCurrencies] = useState();

  const dispatch = useDispatch();

  async function fetchAllAccounts() {
    try {
      const res = await getAllAccounts().unwrap();
      debugger;
      setAllAccounts(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewAccount({
        currencySymbol: selectedCurrencyCode,
      }).unwrap();
      fetchAllAccounts();
    } catch (err) {
      if (!err?.originalStatus) {
        console.log("No Server Response");
      } else if (err.originalStatus === 400 || err.data) {
        console.log(err?.data);
      } else {
        console.log("IDK WHATS UP LOL");
      }
    }
  };
  useLayoutEffect(() => {
    async function fetchAllCurrencies() {
      try {
        const res = await getAllCurrencies().unwrap();
        debugger;
        setAllCurrencies(res);
      } catch (err) {
        console.log(err);
      }
    }
    // promise.all d
    fetchAllAccounts();
    fetchAllCurrencies();
  }, [dispatch, fetchAllAccounts, getAllCurrencies]);

  const createAccountComponent = (
    <div style={{ justifyContent: "center", display: "flex" }}>
      {!showCreateAccountForm && (
        <div
          className={styles.createAnAccountButton}
          onClick={() => {
            setShowCreateAccountForm(true);
          }}
        >
          <h5 style={{ userSelect: "none", padding: "7px" }}>
            Create an account
          </h5>
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
              border: "1px solid black",
              cursor: "pointer",
              width: "fit-content",
              userSelect: "none",
              textAlign: "center",
              padding: "8px",
            }}
          >
            close creation
          </h1>
          <form onSubmit={handleCreateAccountSubmit}>
            <label style={{ userSelect: "none" }} htmlFor="selectCurrency">
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
                <option key={`ee${ind}`} value={currency.symbol}>
                  {currency.symbol}
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
