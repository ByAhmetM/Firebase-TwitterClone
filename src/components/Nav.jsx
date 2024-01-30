import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "./../constant";

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-center px-2 py-4">
      {/* linkler ve logo */}
      <div>
        <img
          className="w-14 mb-4 cursor-pointer p-2 rounded-full hover:bg-gray-700"
          src="x-logo-white.png"
          alt="logo"
        />
        <div className="flex flex-col gap-2">
          {navSections.map((a, i) => (
            <div
              key={i}
              className="flex justify-center md:justify-normal items-center gap-5  md:text-xl p-3 cursor-pointer transition rounded-3xl hover:bg-[#505050b7]"
            >
              <span className="text-3xl"> {a.icon}</span>
              <span className="max-md:hidden whitespace-nowrap text-xl font-bold ">
                {a.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* kullanıcı bilgileri */}
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce">
            .
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>
            <button className="flex justify-center gap-2 items-center p-1 bg-gray-700 rounded text-2xl md:text-[15px]">
              <span className="text-2xl">
                <BiDoorOpen />
              </span>
              <span className="max-md:hidden"> Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
