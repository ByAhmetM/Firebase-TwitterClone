import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import moment from "moment/moment";
import "moment/locale/tr";
import { CiBookmark } from "react-icons/ci";
import { auth, db } from "../../firebase/config";
import DropDown from "../DropDown";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Post = ({ tweet }) => {
  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz ?")) {
      const tweetRef = doc(db, "tweets", tweet.id);

      await deleteDoc(tweetRef);
    }
  };

  const isLiked = tweet.likes.find((id) => id === auth.currentUser.uid);

  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);
    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  const date = moment(tweet?.createdAt?.toDate());
  const fromNow = date.fromNow();
  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700 hover:bg-[#5d5d5d4a] cursor-pointer">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-image"
      />
      <div className="w-full ">
        {/* üst kısım kullanıcı bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold hover:underline">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet?.user?.name?.toLowerCase().replaceAll(" ", "_")}
            </p>
            <p
              title={date.format("LLLL")}
              className="text-gray-400 hover:underline"
            >
              {fromNow}
            </p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown handleDelete={handleDelete} />
          )}
        </div>
        {/* tweet içeriği */}
        <div className="mt-1 mb-3">
          {tweet.textContent && <p>{tweet.textContent}</p>}
          {tweet.imageContent && (
            <img
              className="rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* iconlar */}
        <div className="flex justify-between items-center gap-10">
          <div className="flex justify-between flex-1 text-xl">
            <div
              title="Yanıtla"
              className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]"
            >
              <BiMessageRounded />
            </div>
            <div
              title="Yeniden Gönder"
              className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]"
            >
              <FaRetweet />
            </div>
            <div
              onClick={handleLike}
              title="Beğen"
              className="flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]"
            >
              {isLiked ? <FcLike /> : <AiOutlineHeart />}
              <span className="text-sm">{tweet.likes.length}</span>
            </div>
            <div
              title="Görüntüle"
              className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]"
            >
              <TbChartInfographic />
            </div>
          </div>
          <div className="flex items-center">
            <div
              title="Yer İşareti"
              className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]"
            >
              <CiBookmark />
            </div>
            <div
              title="Paylaş"
              className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]"
            >
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
