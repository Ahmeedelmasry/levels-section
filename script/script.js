//Global Vars
let LevelsOptions = "";
let selectionsArr = []; //Gather Assign Data
let selectionsTable = document.querySelector(
  ".display-assign-selections table tbody"
);

window.onload = () => {
  customizeDropdownMenu(); //Trigger Customizing Menu Function
  assignToggleBtns(); //Trigger Assign Function
  pushFirstSelectionsToArr();
  pushSecondSelectionsToArr();
};

//Functions
// 0 => Restful Api Call Data
const requestLvlsData = () => {
  setTimeout(() => {
    LevelsOptions = {
      firstLvl: [
        { id: 0, text: "first option" },
        { id: 1, text: "second option" },
      ],
      secondLvl: [
        { id: 2, text: "Third option" },
        { id: 3, text: "Fourth option" },
      ],
    };
    appendOptionsFromRestToMenus(LevelsOptions);
    customizeDropdownMenu(); //Trigger Customizing Menu Function
    pushFirstSelectionsToArr();
    pushSecondSelectionsToArr();
  }, 2000);
};

// 1 => Toggle Adding Assign Menus
const assignToggleBtns = () => {
  const assignBtns = document.querySelectorAll(".menu-swap-btns button");
  assignBtns.forEach((btn) => {
    btn.addEventListener("blur", () => {
      btn.getElementsByClassName.cssText = `
        border: none; outline: none
      `;
    });
    btn.addEventListener("click", (e) => {
      let chosenMenu = document.querySelector(e.currentTarget.dataset.level);
      if (chosenMenu.classList.contains("opened")) {
        chosenMenu.classList.remove("opened");
        e.currentTarget.classList.remove("active-menu-btn");
      } else {
        document.querySelectorAll(".add-assign-select").forEach((menu) => {
          menu.classList.remove("opened");
        });
        assignBtns.forEach((menu) => {
          menu.classList.remove("active-menu-btn");
        });
        e.currentTarget.classList.add("active-menu-btn");
        chosenMenu.classList.add("opened");
      }
    });
  });
};

// 2 => Customize Dropdown Menu (Styling Check Box)
const customizeDropdownMenu = () => {
  let menuLists = document.querySelectorAll(".multiselect-dropdown-list");
  menuLists.forEach((menu) => {
    menu.classList.add("dropdown");
    let menuItem = menu.querySelectorAll(".multiselect-dropdown-list div");
    menuItem.forEach((item) => {
      let spanEl = document.createElement("span");
      spanEl.className = "checkmark";
      spanEl.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7.326"
        height="6.766"
        viewBox="0 0 7.326 6.766"
      >
        <path
          id="_211644_checkmark_icon"
          data-name="211644_checkmark_icon"
          d="M55.384,64.705l-.967-.763a.172.172,0,0,0-.109-.042.169.169,0,0,0-.111.044l-3.518,4.52S49.3,67.134,49.257,67.1s-.09-.1-.167-.1-.113.055-.153.1-.523.55-.766.807c-.014.016-.023.025-.035.037a.174.174,0,0,0-.035.1.169.169,0,0,0,.035.1l.049.046s2.454,2.357,2.494,2.4a.236.236,0,0,0,.162.092c.07,0,.129-.076.162-.109l4.388-5.637a.175.175,0,0,0,.035-.1A.181.181,0,0,0,55.384,64.705Z"
          transform="translate(-48.1 -63.9)"
          fill="#fff"
        />
      </svg>
      `;
      item.appendChild(spanEl);
    });
  });
};

// 3 => Adding Selections In Assign
const addSelectionsToTable = (arr, container) => {
  container.innerHTML = "";
  arr.forEach((selection) => {
    let row = document.createElement("tr");
    let departmentName = document.createElement("td");
    departmentName.innerText = selection.department;
    departmentName.className = "dep-name";
    departmentName.setAttribute("data-val", selection.value);
    let lvl = document.createElement("td");
    lvl.innerText = selection.level;
    let action = document.createElement("td");
    action.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.601"
        height="13.63"
        viewBox="0 0 10.601 13.63"
      >
        <path
          id="Path_265"
          data-name="Path 265"
          d="M10.757,18.116a1.514,1.514,0,0,0,1.514,1.514H18.33a1.514,1.514,0,0,0,1.514-1.514V9.029H10.757ZM20.6,6.757h-2.65L17.194,6H13.408l-.757.757H10V8.272H20.6Z"
          transform="translate(-10 -6)"
          fill="#c72627"
        />
      </svg>
      `;
    row.appendChild(departmentName);
    row.appendChild(lvl);
    row.appendChild(action);
    container.appendChild(row);
    action.querySelector("svg").addEventListener("click", () => {
      deleteSelectionFromtable(arr, action);
    });
  });
  console.log(arr);
};
// 4 => Push Selections to arr from First Level
const pushFirstSelectionsToArr = () => {
  let selectInptsFirst = document.querySelectorAll(
    ".assign-select-one .multiselect-dropdown-list div"
  );
  let optionsOne = document.querySelectorAll(
    ".assign-select-one select option"
  );
  selectInptsFirst.forEach((box, i) => {
    box.addEventListener("click", (e) => {
      if (e.currentTarget.querySelector("input").checked) {
        const selectionObj = {
          department: optionsOne[i].innerText,
          level: "الاول",
          value: optionsOne[i].value,
        };
        selectionsArr.push(selectionObj);
        addSelectionsToTable(selectionsArr, selectionsTable);
        e.currentTarget.style.display = "none"; //Hide Selections
      }
      checkEmtyMenu(1);
    });
  });
};

// 5 => Push Selections to arr from Second Level
requestLvlsData();
const pushSecondSelectionsToArr = () => {
  let selectInptsSecond = document.querySelectorAll(
    ".assign-select-two .multiselect-dropdown-list div"
  );
  let optionsTwo = document.querySelectorAll(
    ".assign-select-two select option"
  );
  selectInptsSecond.forEach((box, i) => {
    box.addEventListener("click", (e) => {
      if (e.currentTarget.querySelector("input").checked) {
        const selectionObj = {
          department: optionsTwo[i].innerText,
          level: "الثاني",
          value: optionsTwo[i].value,
        };
        selectionsArr.push(selectionObj);
        e.currentTarget.style.display = "none"; //Hide Selections
        addSelectionsToTable(selectionsArr, selectionsTable);
      }
      checkEmtyMenu(2);
    });
  });
};

// 6 => Delete Items From Table
const deleteSelectionFromtable = (arr, el) => {
  el.addEventListener("click", () => {
    const compareVal = el.parentElement.querySelector(".dep-name").dataset.val;

    arr.forEach((item, i) => {
      if (item.value == compareVal) {
        arr.splice(i, 1);
      }
    });

    let allSelections = document.querySelectorAll(
      ".assigns .multiselect-dropdown-list div"
    );

    allSelections.forEach((item) => {
      if (item.querySelector("input").value == compareVal) {
        item.style.display = "flex";
        item.querySelector("input").checked = false;
      }
    });
    addSelectionsToTable(arr, selectionsTable);
    checkEmtyMenu(1);
    checkEmtyMenu(2);
  });
};

// 7 => Append Data To First Lvl Menu After Call
const appendOptionsFromRestToMenus = (loadedOptions) => {
  let firstOptsContainer = document.querySelector(".assign-select-one");
  let secondOptsContainer = document.querySelector(".assign-select-two");

  firstOptsContainer.innerHTML = "";
  secondOptsContainer.innerHTML = "";

  //Handling First Menu
  let firstSelect = document.createElement("select");
  firstSelect.className = "related-select add-assign-select first";
  firstSelect.setAttribute("name", "select");
  firstSelect.setAttribute("multiple", "multiple");
  firstSelect.setAttribute("multiselect-all", "true");

  loadedOptions.firstLvl.forEach((opt) => {
    let option = document.createElement("option");
    option.innerText = opt.text;
    option.value = opt.id;
    firstSelect.appendChild(option);
    firstOptsContainer.appendChild(firstSelect);
  });

  //handling Second Menu
  let secondSelect = document.createElement("select");
  secondSelect.className = "related-select add-assign-select second";
  secondSelect.setAttribute("name", "select");
  secondSelect.setAttribute("multiple", "multiple");
  secondSelect.setAttribute("multiselect-all", "true");

  loadedOptions.secondLvl.forEach((opt) => {
    let option = document.createElement("option");
    option.innerText = opt.text;
    option.value = opt.id;
    secondSelect.appendChild(option);
    secondOptsContainer.appendChild(secondSelect);
  });
  const assignBtns = document.querySelectorAll(".menu-swap-btns button");
  assignBtns.forEach((btn) => {
    btn.classList.remove("active-menu-btn");
  });
  MultiselectDropdown(window.MultiselectDropdownOptions);
  //Adding Values To Dropdown Menu Options
  let dropdownFirst = document.querySelector(
    ".assign-select-one .multiselect-dropdown-list"
  );
  let dropdownSecond = document.querySelector(
    ".assign-select-two .multiselect-dropdown-list"
  );
  dropdownFirst.querySelectorAll("div").forEach((parent, i) => {
    parent.querySelector("input").value = loadedOptions.firstLvl[i].id;
  });
  dropdownSecond.querySelectorAll("div").forEach((parent, i) => {
    parent.querySelector("input").value = loadedOptions.secondLvl[i].id;
  });
};

// 8 => Check If Menu Is Empty
const checkEmtyMenu = (menuNum) => {
  let menuParent =
    menuNum == 1
      ? document.querySelector(".assign-select-one .multiselect-dropdown-list")
      : document.querySelector(".assign-select-two .multiselect-dropdown-list");
  let optionsDivs = menuParent.querySelectorAll("div");
  let p_element = document.createElement("p");
  p_element.className = "empty-alert";
  p_element.appendChild(document.createTextNode("لايوجد خيارات اخري"));
  let isEmpty;
  for (let i = 0; i < optionsDivs.length; i++) {
    if (optionsDivs[i].style.display != "none") {
      isEmpty = false;
      break;
    } else {
      isEmpty = true;
    }
  }
  if (isEmpty) {
    if (!menuParent.querySelector(".empty-alert")) {
      menuParent.appendChild(p_element);
    }
  } else {
    if (menuParent.querySelector(".empty-alert")) {
      menuParent.querySelector(".empty-alert").remove();
    }
  }
};
