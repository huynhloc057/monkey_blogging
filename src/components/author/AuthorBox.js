import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebase-config";

const AuthorBox = ({ userId }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      console.log("docSnapshot", docSnapshot.data());
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  console.log(user);
  if (!userId || !user.username) return;
  return (
    <div className="author">
      <div className="author-image">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
