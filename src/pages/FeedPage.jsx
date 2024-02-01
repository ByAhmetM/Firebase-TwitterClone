import Nav from "./../components/Nav";
import Main from "./../components/Main";
import Aside from "./../components/Aside";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../firebase/config";
import Profile from "../components/Profile";

const FeedPage = () => {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));
    return () => unsub();
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav setOpenProfile={setOpenProfile} user={user} />
      {openProfile ? (
        <Profile setOpenProfile={setOpenProfile} user={user} />
      ) : (
        <Main user={user} />
      )}
      <Aside open={() => setOpenProfile(true)} />
    </div>
  );
};

export default FeedPage;
