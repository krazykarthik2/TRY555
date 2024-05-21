import React, { useEffect, useState } from "react";
import Login from "./Login";
import Adminfx from "./Adminfx"
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    // Set an authentication state observer and get user data
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="h-100 vstack">
      <h1>Admin Portal</h1>
      {user==null?
      <Login auth={auth}/>:
      <Adminfx/>}
    </div>
  );
}

export default Admin;
