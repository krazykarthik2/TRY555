import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Adminfx from "./Adminfx";
import Login from "./Login";
import Loading from "../utils/Loading";
const auth = getAuth();
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Set an authentication state observer and get user data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="h-100 vstack">
      {user == null && <h1>Admin Portal</h1>}
      {loading ? (
        <Loading />
      ) : (
        <>{user == null ? <Login auth={auth} /> : <Adminfx />}</>
      )}
    </div>
  );
}

export default Admin;
