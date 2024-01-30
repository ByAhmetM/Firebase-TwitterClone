import Form from "./Form";
const Main = ({ user }) => {
  return (
    <div className="border border-gray-700 overflow-y-auto p-6">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      <Form user={user} />

      {/* tweet listeleme */}
    </div>
  );
};

export default Main;
