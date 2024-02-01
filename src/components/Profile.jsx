import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "./Post/index";
import { FaArrowLeft } from "react-icons/fa";

const Profile = ({ setOpenProfile, user }) => {
  const [tweets, setTweets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState("Gonderiler");

  const tweetsCol = collection(db, "tweets");

  const options = query(tweetsCol, orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsub = onSnapshot(options, (snapshot) => {
      const tempTweets = [];

      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      setTweets(tempTweets);
    });
    return () => unsub();
  }, []);

  const uploadImage = async (file) => {
    if (!file?.type?.startsWith("image")) return null;
    const fileRef = ref(storage, file.name.concat(v4()));

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target[0].value;
    const pass = e.target[1].value;
    const image = e.target[2].files[0];

    const url = await uploadImage(image);

    updateProfile(auth.currentUser, {
      displayName: name,
      password: pass,
      photoURL: url,
    })
      .then(() => toast.success("Başarıyla güncellendi."))
      .catch((err) => {
        toast.error("Hata oluştu"), console.log(err);
      });
    setIsLoading(false);
    setOpenProfile(false);
  };

  return (
    <div className="overflow-auto flex flex-col items-center gap-10 py-10 border-l-[1px] border-gray-400 border-r-[1px]">
      {/* üst kısım */}
      <div className="flex self-start items-center p-2 gap-5">
        <button
          onClick={() => setOpenProfile(false)}
          className="p-2 text-xl rounded-xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl capitalize">{auth.currentUser.displayName}</h2>
      </div>
      <div className="flex items-center justify-between w-full p-3">
        {/* kullanıcı bilgileri */}
        <div className="flex flex-col items-center gap-5">
          {/* kullanıcı photo */}
          <img
            className="h-32 w-32 border-[5px] border-gray-300  rounded-full hover:opacity-80 cursor-pointer"
            src={auth?.currentUser?.photoURL}
            alt="ProfilePhoto"
          />
          {/* kullanıcı adı */}
          <p className="flex flex-col gap-1">
            <span className="capitalize font-bold text-xl">
              {auth?.currentUser?.displayName}
            </span>
            <span className="text-sm text-gray-400">
              @{auth?.currentUser?.displayName.replace(" ", "_")}
            </span>
          </p>
        </div>

        {!isEdit && (
          <button
            className=" border-[1px] p-3 font-bold rounded-xl text-sm hover:bg-gray-800"
            onClick={() => setIsEdit(true)}
          >
            Profili Ayarla
          </button>
        )}
      </div>

      {/* güncelleme formu */}

      {isEdit && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-5 border p-5"
        >
          <div className="flex items-center gap-3">
            <label htmlFor="">İsim Soyisim: </label>
            <input
              defaultValue={auth?.currentUser?.displayName}
              required
              className="pl-2 text-black rounded"
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="">Şifre: </label>
            <input
              required
              className="pl-2 text-black rounded"
              type="password"
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="">Profil Fotoğrafı</label>
            <input type="file" required />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="grid place-items-center bg-blue-500 rounded-xl w-20 p-1 text-sm "
            >
              {isLoading ? <img src="spinner.svg" /> : "Güncelle"}
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="grid place-items-center bg-red-500 rounded-xl w-20 p-1 text-sm "
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}

      {/* tweets */}
      <div>
        <h2 className="my-3 text-center">
          <span className="text-red-500 capitalize">
            {auth.currentUser.displayName}
          </span>{" "}
          adlı kullanıcıya ait{" "}
          <span className=" text-green-500 capitalize font-bold">
            {isActive.replace("_", " ")}
          </span>
        </h2>
        <div className="profile-buttons flex justify-between items-center my-5">
          <button
            onClick={() => setIsActive("Gonderiler")}
            className={`${isActive === "Gonderiler" ? "aktif" : ""}`}
          >
            Gönderiler
          </button>
          <button
            onClick={() => setIsActive("Yanitlar")}
            className={`${isActive === "Yanitlar" ? "aktif" : ""}`}
          >
            Yanıtlar
          </button>
          <button
            onClick={() => setIsActive("One_Cikanlar")}
            className={`${isActive === "One_Cikanlar" ? "aktif" : ""}`}
          >
            Öne Çıkanlar
          </button>
          <button
            onClick={() => setIsActive("Medya")}
            className={`${isActive === "Medya" ? "aktif" : ""}`}
          >
            Medya
          </button>
          <button
            onClick={() => setIsActive("Begeniler")}
            className={`${isActive === "Begeniler" ? "aktif" : ""}`}
          >
            Beğeni
          </button>
        </div>
        {tweets?.map(
          (tweet) =>
            tweet.user.id === auth.currentUser.uid && (
              <Post key={tweet.id} tweet={tweet} />
            )
        )}
      </div>
    </div>
  );
};

export default Profile;
