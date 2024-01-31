import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, storage } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

    console.log(image);

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
    navigate("/feed");
  };

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen">
      <div className="flex justify-between items-center gap-10">
        <h2 className="text-2xl">Profilini Düzenle</h2>
        <Link to={"/feed"} className="p-2 text-sm bg-red-500 rounded-xl">
          Geri Dön
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <img
          className="h-12 w-12 rounded-full"
          src={auth?.currentUser?.photoURL}
          alt="ProfilePhoto"
        />
        <p>
          Hoşgeldin{" "}
          <span className="capitalize text-red-500">
            {auth?.currentUser?.displayName}
          </span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 border p-5"
      >
        <div className="flex items-center gap-3">
          <label htmlFor="">İsim Soyisim: </label>
          <input required className="pl-2 text-black rounded" type="text" />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="">Şifre: </label>
          <input required className="pl-2 text-black rounded" type="password" />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="">Profil Fotoğrafı</label>
          <input type="file" required />
        </div>
        <button
          type="submit"
          className="grid place-items-center bg-blue-500 rounded-xl w-24 p-2 "
        >
          {isLoading ? <img src="spinner.svg" /> : "Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
