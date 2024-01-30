import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db } from "../firebase/config";

const Form = ({ user }) => {
  const tweetsCol = collection(db, "tweets");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    await addDoc(tweetsCol, {
      textContent,
      imageContent: null,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
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
          placeholder="Neler oluyor?"
        />
        <div className="flex justify-between items-center">
          <input className="hidden" id="image" type="file" />
          <label
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>
          <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
