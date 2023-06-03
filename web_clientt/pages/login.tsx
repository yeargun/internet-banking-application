import { useRef, useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCredentials } from "features/auth/authSlice";
import { useLoginMutation } from "features/auth/authApiSlice";
import Link from "next/link";
import { cookies } from "./_app";

function Login() {
  const usernameRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove("Authorization");
    usernameRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...jwtToken }));
      if (typeof window !== "undefined") {
        localStorage.setItem("username", username);
      }
      setUsername("");
      setPassword("");
      router.push("/transactions");
    } catch (err) {
      if (!err?.originalStatus) {
        // isloading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };

  return (
    <main className={styles.main}>
      <div style={{ marginTop: "150px" }} className={styles.page}>
        <div style={{ marginTop: "50px" }} className={styles.header}></div>
        <div className={styles.container}>
          {errMsg && (
            <p ref={errRef} className={styles.errMsg} aria-live="assertive">
              {errMsg}
            </p>
          )}
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              placeholder="Id number"
              onChange={handleUsernameInput}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordInput}
            />
            <button className={styles.formButton}>Login</button>
          </form>
        </div>
      </div>
      <div className={styles.option}>
        <p>
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
      <div className={styles.otherapps}>
        <p>Get the app, maybe</p>
        <button type="button">
          <i className="fab fa-apple"></i> App Store
        </button>
        <button type="button">
          <i className="fab fa-google-play"></i> Google Play
        </button>
      </div>
    </main>
  );
}

export default Login;
