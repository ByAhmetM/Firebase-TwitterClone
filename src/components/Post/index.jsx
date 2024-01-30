const Post = ({ tweet }) => {
  console.log(tweet);
  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-gray-700">
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
          {tweet.imageContent && <img src={tweet.imageContent} />}
        </div>
        {/* iconlar */}
        <div></div>
      </div>
    </div>
  );
};

export default Post;
