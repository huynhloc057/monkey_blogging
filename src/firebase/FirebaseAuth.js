import { React, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";

const FireBaseAuth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserInfo(currentUser);
      } else {
        setUserInfo("");
      }
    });
  }, []);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //   console.log(values);
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("cred", cred);

      await updateProfile(auth.currentUser, {
        displayName: "Tran Anh Tuan", //cred.user.displayName fail
      });

      setUserInfo(cred);
      console.log("Create user successfully");
      const userRef = collection(db, "users");
      await addDoc(userRef, {
        email: values.email,
        password: values.password,
        id: cred.user.uid,
      });
    } catch (error) {
      console.log("error", error);
    }
    // if (user) setUserInfo(user);
  };

  const handleSignOut = (e) => {
    signOut(auth);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    setUserInfo(cred);
    console.log("Login successfully");
  };
  return (
    <>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10 mt-10">
        <form onSubmit={handleCreateUser}>
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            // value={values.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            // value={values.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-400 rounded-lg text-md"
          >
            SignUp
          </button>
        </form>
        <div className="flex items-center mt-10 gap-x-5">
          <span>{userInfo?.displayName}</span>
          <button
            className="p-3 font-semibold text-white bg-purple-500 rounded-lg text-md"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        </div>
      </div>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10 mt-10">
        <form onSubmit={handleLogin} className="mt-10">
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            // value={values.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-200 rounded outline-none focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            // value={values.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-pink-400 rounded-lg text-md"
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default FireBaseAuth;
