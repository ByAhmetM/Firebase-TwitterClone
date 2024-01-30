import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post";

const Main = ({ user }) => {
  const tweetsCol = collection(db, "tweets");

  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(tweetsCol, (snapshot) => {
      const tempTweets = [];

      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      setTweets(tempTweets);
    });
    return () => unsub();
  }, []);

  return (
    <div className="border border-gray-700 overflow-y-auto p-6">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      <Form user={user} />

      {/* tweet listeleme */}
      {!tweets ? (
        <Spinner />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
