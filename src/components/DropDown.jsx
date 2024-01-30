const DropDown = () => {
  return (
    <label class="popup">
      <input type="checkbox" />
      <div class="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="popup-window">
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
