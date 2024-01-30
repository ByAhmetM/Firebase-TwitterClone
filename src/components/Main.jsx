import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "./Spinner";
import Post from "./Post";
import { CiSettings } from "react-icons/ci";

const Main = ({ user }) => {
  const [followed, setFollowed] = useState("personel");

  const tweetsCol = collection(db, "tweets");

  const options = query(tweetsCol, orderBy("createdAt", "desc"));

  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(options, (snapshot) => {
      const tempTweets = [];

      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      setTweets(tempTweets);
    });
    return () => unsub();
  }, []);

  return (
    <div className="main border border-gray-700 overflow-y-auto ">
      <header className=" border-b-[1px] border-gray-700">
        <p className="p-3 flex justify-center cursor-pointer text-gray-500 transition hover:bg-gray-700 flex-1 w-full h-full">
          <span
            onClick={() => setFollowed("personel")}
            className={followed === "personel" ? "sanaozel" : ""}
          >
            Sana özel
          </span>
        </p>
        <p className="p-3 flex justify-center cursor-pointer text-gray-500 transition hover:bg-gray-700 flex-1 w-full h-full">
          <span
            onClick={() => setFollowed("followed")}
            className={followed === "followed" ? "sanaozel " : ""}
          >
            Takip edilenler
          </span>
        </p>
        <button className="rounded-full transition p-1 text-2xl font-bold hover:bg-gray-700">
          <CiSettings />
        </button>
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
