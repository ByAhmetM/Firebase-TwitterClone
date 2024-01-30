const DropDown = () => {
  return (
    <label className="popup">
      <input type="checkbox" />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Eylemler</legend>
        <ul>
          <li>
            <button>
              <img src="edit.svg" alt="" />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button>
              <img src="delete.svg" alt="" />
              <span>Kaldır</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default DropDown;
