import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const Aside = ({ open }) => {
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
      <button
        onClick={open}
        className="px-3 py-2 rounded-xl bg-blue-500 transition hover:bg-blue-700"
      >
        Profil
      </button>
    </div>
  );
};

export default Aside;
