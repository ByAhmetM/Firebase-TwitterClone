import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const Aside = () => {
  const [data, setData] = useState(null);
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetsCount: count(),
    }).then((data) => setData(data._data));
  }, []);

  return (
    <div className="max-lg:hidden">
      <p className="my-5 text-center p-3 text-lg">
        Toplam Tweet Sayısı: {data?.tweetsCount?.integerValue}
      </p>
    </div>
  );
};

export default Aside;
