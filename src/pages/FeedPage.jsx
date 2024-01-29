import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          signOut(auth);
          navigate("/");
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default FeedPage;
