import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";
import { LuListTodo, LuCalendarClock } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);
  const tweetsCol = collection(db, "tweets");

  /* aldığı fotoğrafı storagea kaydet ve urli döndür */

  const uploadImage = async (file) => {
    if (!file?.type?.startsWith("image")) return null;
    const fileRef = ref(storage, file.name.concat(v4()));

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  /* tweet gönder */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = text;
    const imageContent = image;

    /* doğrulama */
    if (!textContent && !imageContent)
      return toast.info("Lütfen içerik ekleyiniz");

    setIsLoading(true);

    const url = await uploadImage(imageContent);

    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    setIsLoading(false);

    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] mh:h-[45px] mt-1"
        src={user?.photoURL}
        alt=""
      />
      <div className=" w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Neler oluyor?"
        />
        <div className="flex justify-between items-center">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="image"
            type="file"
          />
          <div className="flex items-center ">
            <label
              className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
              htmlFor="image"
            >
              <BsCardImage />
            </label>
            <span className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full">
              <MdOutlineGifBox />
            </span>

            <span className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full">
              <LuListTodo />
            </span>
            <span className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full">
              <MdOutlineEmojiEmotions />
            </span>
            <span className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full">
              <LuCalendarClock />
            </span>

            <span className="text-blue-500 hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full">
              <CiLocationOn />
            </span>
          </div>
          {!text && !image ? (
            <button className="bg-blue-600 opacity-50 cursor-not-allowed flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
              {isLoading ? <img src="spinner.svg" /> : "Gönder"}
            </button>
          ) : (
            <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
              {isLoading ? <img src="spinner.svg" /> : "Gönder"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
