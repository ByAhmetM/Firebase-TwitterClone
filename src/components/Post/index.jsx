import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

const Post = ({ tweet }) => {
  console.log(tweet);
  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt="user-image"
      />
      <div className="w-full">
        {/* üst kısım kullanıcı bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replaceAll(" ", "_")}
            </p>
            <p className="text-gray-400">date</p>
          </div>
          <button>|||</button>
        </div>
        {/* tweet içeriği */}
        <div>
          {tweet.textContent && <p>{tweet.textContent}</p>}
          {tweet.imageContent && (
            <img
              className="rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* iconlar */}
        <div className="flex justify-between">
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]">
            <AiOutlineHeart />
          </div>
          <div className="py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
