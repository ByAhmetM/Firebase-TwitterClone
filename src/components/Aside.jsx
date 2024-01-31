import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  const [data, setData] = useState(null);
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetsCount: count(),
    }).then((data) => setData(data._data));
  }, []);

  return (
    <div className="max-lg:hidden flex flex-col items-center">
      <p className="my-5 text-center p-3 text-lg">
        Toplam Tweet Sayısı: {data?.tweetsCount?.integerValue}
      </p>
      <Link
        to={"/profile"}
        className="px-3 py-2 rounded-xl bg-blue-500 transition hover:bg-blue-700"
      >
        Profil
      </Link>
    </div>
  );
};

export default Aside;
