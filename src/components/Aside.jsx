import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

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
      <div className="relative p-1">
        <input
          type="text"
          placeholder="Ara"
          className="rounded-3xl px-12 py-3 mt-5 text-lg bg-gray-700"
        />
        <span className="absolute left-3 top-9 text-3xl">
          <CiSearch />
        </span>
      </div>
      <p className="my-5 text-center p-3 text-lg">
        Tweeterdaki Toplam <br />
        Tweet Sayısı: {data?.tweetsCount?.integerValue}
      </p>
      <button
        onClick={open}
        className="px-3 py-2 rounded-xl bg-blue-500 transition hover:bg-blue-700"
      >
        Profile Git
      </button>
    </div>
  );
};

export default Aside;
