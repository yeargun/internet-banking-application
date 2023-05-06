import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllAccountsMutation } from "features/account/accountApiSlice";
import JSONPretty from "react-json-pretty";

function Accounts() {
  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();
  const [allAccounts, setAllAccounts] = useState();

  const dispatch = useDispatch();

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
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <h1>All accounts</h1>
      {allAccounts && (
        <JSONPretty id="json-pretty" data={allAccounts}></JSONPretty>
      )}
    </>
  );
}

export default Accounts;
