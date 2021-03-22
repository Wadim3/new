function fetchHandler(res) {
  if (res.ok) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(new Error(res.status));
  }
}
function json(response) {
  return response.json();
}
function text(response) {
  return response.text();
}
function parseURL(url) {
  return new URLSearchParams(url);
}
function generErr(code, message) {
  let frag = document.createDocumentFragment(),
    bl = create("div", "error_cont"),
    top = create("div", "top-code__error"),
    codebl = create("div", "code__error"),
    text = create("div", "text__error");
  codebl.innerText = code;
  text.innerHTML = message;
  top.append(codebl, text);
  bl.append(top);
  frag.append(bl);
  return frag;
}
function loadNew(params) {
  let contBlock = document.getElementById("content-js");
  // if (sessionStorage.getItem(params) !== null) {
  //   contBlock.innerHTML = "";
  //   generHand(sessionStorage.getItem(params));
  //   pagesReload();
  //   console.info("add localstorage1234");
  //   return;
  // }
  fetch("lgame.php" + params)
    .then(fetchHandler)
    .then(text)
    .then((res) => {
      contBlock.innerHTML = "";
      if (sessionStorage.getItem(params) === null) {
        sessionStorage.setItem(params, res);
        console.info("add localstorage 1 ");
      }
      generHand(res, params, contBlock);
      pagesReload();
      console.log(res);
    })
    .catch((error) => {
      let errArr = {
        404: "Хмм...Похоже здесь ничего нет",
        503: "Сервер временно недоступен",
      };
      if (errArr[error.message]) {
        contBlock.innerHTML = "";
        contBlock.append(generErr(error.message, errArr[error.message]));
      }
      noticeAll("Код ошибки: " + error.message, 1);
      console.error(error);
    });
}
function generHand(res, par, bl) {
  let url = parseURL(par);
  let json = JSON.parse(res);
  if (url.has("ct")) {
    bl.append(generCont(json));
  } else if (url.has("art")) {
    bl.append(generArt(json));
  } else {
    bl.append(generCont(json));
  }
}
function create(elem, classn = "") {
  let block = document.createElement(elem);
  block.className = classn;
  return block;
}
function rebCateg() {
  let url = parseURL(location.search);
  if ((selDel = document.querySelector(".select_cat")))
    selDel.classList.remove("select_cat");
  if (
    url.has("ct") &&
    (curUrl = document.querySelector("[data-url='ct=" + url.get("ct") + "']"))
  ) {
    let listCat = curUrl.parentNode;
    listCat.classList.add("select_cat");
  }
}
function generCont(json) {
  let frag = document.createDocumentFragment(),
    content = create("div", "content_item");
  for (const key in json) {
    let cloneBl = content.cloneNode(),
      imgBlock = create("div", "img_block"),
      info = create("div", "info_item"),
      bloItem = create("div", "block_item"),
      genre = create("div", "genre_item"),
      views = create("div", "views"),
      imgItem = create("img", "img_item"),
      down = create("div", "down_link"),
      nameGame = create("div", "name_game"),
      desc = create("div", "description"),
      filSpan = create("span", "fil_span");
    imgItem.src = json[key][5];
    imgItem.alt = json[key][1];
    imgItem.onerror = function () {
      this.src = "asset/err_image.svg";
    };
    nameGame.innerText = json[key][1];
    filSpan.setAttribute("data-url", "?art=" + json[key][0]);
    imgBlock.append(filSpan, imgItem, nameGame);
    genre.innerHTML = "Жанр: " + json[key][9];
    views.innerHTML =
      "<svg height='1.2vw' version='1.1' viewBox='0 -25 150 122' width='1.5vw' xmlns='http://www.w3.org/2000/svg'><use xlink:href='#views'></use></svg><span class='view_value'>" +
      json[key][4] +
      "</span>";
    bloItem.append(genre, views);
    desc.innerHTML = json[key][8];
    desc.innerText = desc.innerText;
    down.innerHTML =
      "<a href='?art=" +
      json[key][0] +
      "' class='btn_down'>Скачать</a><div class='item_value'><span class='file_size'></span><img class='down_icon' src='asset/download.svg'><span class='rating'>" +
      json[key][6] +
      "</span></div>";
    info.append(bloItem, desc, down);
    cloneBl.append(imgBlock, info);
    frag.append(cloneBl);
  }
  return frag;
}
function generArt(json) {
  let frag = document.createDocumentFragment(),
    content = create("div", "block-art"),
    shortDesc = create("div", "cont__block short__desc"),
    left = create("div", "left__short-desc"),
    img = create("img", "game__image"),
    right = create("div", "right__short-desc"),
    requires = create("div", "content-requires"),
    full = create("div", "cont__block full-desc"),
    fullTitle = create("div", "title_block"),
    description = create("div", "content-desc"),
    screenshots = create("div", "cont__block screenshot-block"),
    screenTitle = create("div", "title_block"),
    contScreen = create("div", "content-screenshot"),
    video = create("div", "cont__block video_block"),
    vidTitle = create("div", "title_block"),
    contVid = create("div", "content-video"),
    file = create("div", "cont__block file-block"),
    thisjson = json[0],
    media = thisjson[3] ? JSON.parse(thisjson[3]) : "",
    specify = thisjson[2] ? JSON.parse(thisjson[2]) : "",
    torrent = thisjson[4] ? JSON.parse(thisjson[4]) : "";
  img.src = thisjson[6];
  img.alt = thisjson[5];
  rnamePage(thisjson[5]);
  fullTitle.innerText = "Описание:";
  description.innerHTML = thisjson[1];
  screenTitle.innerText = "Скриншоты:";
  vidTitle.innerText = "Видео:";
  for (const key in specify) {
    if (Object.hasOwnProperty.call(specify, key)) {
      const element = specify[key];
      let nameChara = create("span", "requires_name");
      let valueChara = create("span", "requires_value");
      let br = create("br");
      nameChara.innerHTML = key + ": ";
      valueChara.innerHTML = element;
      requires.append(nameChara, valueChara, br);
    }
  }

  for (const key in media.screenshot) {
    if (Object.hasOwnProperty.call(media.screenshot, key)) {
      const element = media.screenshot[key];
      let screenItem = create("img", "screenshot-item");
      screenItem.src = element;
      screenItem.alt = sessionStorage.getItem("title");
      contScreen.append(screenItem);
    }
  }
  for (const key in media.video) {
    if (Object.hasOwnProperty.call(media.video, key)) {
      const element = media.video[key];
      let youtBlock = create("div", "youtube__block");
      youtBlock.id = element;
      youtBlock.style.backgroundImage =
        "url(https://i.ytimg.com/vi/" + element + "/mqdefault.jpg)";
      youtBlock.innerHTML =
        "<div class='filter'></div><div class='yo_icon'><img class='play_icon' src='asset/play__icons.svg'></div>";
      contVid.append(youtBlock);
    }
  }
  for (const key in torrent) {
    if (Object.hasOwnProperty.call(torrent, key)) {
      const element = torrent[key];
      let fileElem = create("div", "file-elem");
      let size = create("div", "file_size");
      size.innerText = element;
      let fileIn = create("span", "file-in");
      let fileUrl = create("a", "file");
      fileUrl.href = key;
      fileUrl.innerText = "Скачать";
      fileIn.append(fileUrl);
      fileElem.append(size, fileIn);
      file.append(fileElem);
    }
  }
  sessionStorage.removeItem("image");
  sessionStorage.removeItem("title");
  left.append(img);
  right.append(requires);
  shortDesc.append(left, right);
  full.append(fullTitle, description);
  screenshots.append(screenTitle, contScreen);
  video.append(vidTitle, contVid);
  content.append(shortDesc, full, screenshots, video, file);
  frag.append(content);
  return frag;
}
function pagesReload() {
  let urlParsed = parseURL(location.search);
  let pageStr = "",
    pages = false;
  if (urlParsed.has("page")) {
    pageStr = " | Страница " + urlParsed.get("page");
    pages = urlParsed.get("page");
    urlParsed.delete("page");
  }
  if (urlParsed.has("ct")) {
    let title = document.querySelector(
      "[data-url='ct=" + urlParsed.get("ct") + "']"
    ).innerText;
    rnamePage(title + pageStr);
  } else if (urlParsed.has("do")) {
    rnamePage();
  } else if (urlParsed.toString() == "") {
    rnamePage("Все игры" + pageStr);
  }
  let curPage = pages ? pages : 1;
  if (urlParsed.has("ct")) rebCateg();
  let blockPage = document.getElementById("page-js");
  blockPage.innerHTML = "";
  fetch("count_page.php" + location.search)
    .then(fetchHandler)
    .then(json)
    .then((resJson) => {
      console.log(resJson);
      if (urlParsed.has("sort") || urlParsed.has("search")) {
        rnamePage("Результатов: " + resJson.all + pageStr);
      }
      if (resJson.count <= 1) return;
      let allPage = resJson.count;
      let frag = document.createDocumentFragment();
      let link = create("a");
      link.className = "page_num";
      let space = create("span");
      space.innerText = "...";
      let first = curPage >= 3 ? curPage - 2 : 1;
      let second = allPage - curPage >= 2 ? Number(curPage) + 2 : allPage;
      for (let i = first; i <= second; i++) {
        let newlink = link.cloneNode();
        urlParsed.set("page", i);
        newlink.href = "?" + urlParsed.toString();
        newlink.setAttribute("data-url", "?" + urlParsed.toString());
        newlink.addEventListener("click", pageLoad);
        newlink.innerText = i;
        if (i == curPage) {
          let curP = create("span");
          curP.innerText = i;
          curP.className = "sel_page";
          frag.append(curP);
          continue;
        }
        frag.append(newlink);
      }
      frag.append(space);
      let newlink = link.cloneNode();
      urlParsed.set("page", allPage);
      newlink.href = "?" + urlParsed.toString();
      newlink.innerText = allPage;
      newlink.setAttribute("data-url", "?" + urlParsed.toString());
      newlink.addEventListener("click", pageLoad);
      frag.append(newlink);
      blockPage.appendChild(frag);
    })
    .catch((error) => {
      noticeAll("Код ошибки:" + error, 1);
      console.error(error);
    });
}
function generCompl(json) {
  let auto = document.getElementById("autocomplete");
  auto.innerHTML = "";
  let frag = document.createDocumentFragment();
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const el = json[key];
      let item = create("div", "auto-item");
      let fil = create("span", "fil_span");
      fil.setAttribute("data-url", "?art=" + el[0]);
      fil.addEventListener("click", loadGame);
      let left = create("div", "auto-left");
      let img = create("img", "auto-img");
      img.src = el[2];
      left.append(img);
      let right = create("div", "auto-right");
      let name = create("span", "auto-name");
      name.innerText = el[1];
      right.append(name);
      item.append(fil, left, right);
      frag.append(item);
    }
  }
  auto.append(frag);
}
function noticeAll(text, type = 0) {
  let arrNotice = [
      ["asset/info.svg", "Новое уведомление", ""],
      ["asset/error.svg", "Произошла ошибка", "error"],
    ],
    frag = document.createDocumentFragment(),
    hr = create("hr"),
    block = create("div"),
    stat = create("div"),
    textStat = create("div"),
    img = create("img"),
    textElem = create("div");
  block.className = "block__notice temp " + arrNotice[type][2];
  stat.className = "status_notice";
  textStat.className = "text__status-notice";
  textStat.innerText = arrNotice[type][1];
  img.className = "image__status-notice";
  img.alt = arrNotice[type][1];
  img.src = arrNotice[type][0];
  stat.append(img, textStat);
  hr.className = "hr";
  textElem.className = "text_notice";
  textElem.innerText = text;
  block.append(stat, hr, textElem);
  frag.append(block);
  document.getElementById("notice-all").appendChild(frag);
  setTimeout(() => {
    block.classList.remove("temp");
  }, 100);
  setTimeout(() => {
    block.classList.add("temp");
  }, 3500);
  setTimeout(() => {
    block.remove();
  }, 3900);
}
function rnamePage(name) {
  document.title = name;
  document.getElementById("rename_page-js").innerText = name;
}
function loadCat(e) {
  e.preventDefault();
  let tar = e.target;
  if (tar.classList.contains("cat_list")) tar = tar.firstChild;
  if (!tar.hasAttribute("data-url")) return;
  let state = {
    url: "?" + tar.getAttribute("data-url"),
    title: tar.innerText,
    xPage: window.pageYOffset || document.documentElement.scrollTop,
  };
  history.pushState(state, state.title, state.url);
  // rnamePage(tar.innerText);

  loadNew("?" + tar.getAttribute("data-url"));
}
function pageLoad(e) {
  e.preventDefault();
  if (this.classList.contains("page_num")) {
    let title =
      document.title.split("|")[0] + " | " + "Страница " + this.innerText;
    let state = {
      url: this.getAttribute("data-url"),
      title: title,
      xPage: window.pageYOffset || document.documentElement.scrollTop,
    };
    history.pushState(state, state.title, state.url);
    document.getElementById("rename_page-js").scrollIntoView();
    // rnamePage(title);
    loadNew(this.getAttribute("data-url"));
  }
}
function loadGame(e) {
  let tar = e.target;
  if (!tar.hasAttribute("data-url")) return;
  let title = tar.nextElementSibling.innerText;
  let state = {
    url: tar.getAttribute("data-url"),
    title: title,
    xPage: window.pageYOffset || document.documentElement.scrollTop,
  };
  history.pushState(state, state.title, state.url);
  document.getElementById("rename_page-js").scrollIntoView();
  // rnamePage(title);
  loadNew(tar.getAttribute("data-url"));
}
function contentHand(e) {
  let tar = e.target;
  let url = parseURL(location.search);
  url.delete("page");
  if (tar.hasAttribute("data-url")) {
    tar.addEventListener("click", loadGame);
  }
}
function formSearch(e) {
  e.preventDefault();
  let form = new FormData(this);
  let noUi = slideForm.noUiSlider.get();
  form.append("min", Number(noUi[0]));
  form.append("max", Number(noUi[1]));
  let params =
    "?sort=" +
    form.get("sort") +
    "&cat=" +
    form.get("cat") +
    "&lang=" +
    form.get("lang") +
    "&min=" +
    form.get("min") +
    "&max=" +
    form.get("max");
  let state = {
    url: params,
    title: "Результаты",
    xPage: window.pageYOffset || document.documentElement.scrollTop,
  };
  history.pushState(state, state.title, state.url);
  // rnamePage(state.title);
  loadNew(params);
}
function searchWord(e) {
  e.preventDefault();
  let params = "?search=" + document.getElementById("string").value;
  let state = {
    url: params,
    title: "Результаты",
    xPage: window.pageYOffset || document.documentElement.scrollTop,
  };
  history.pushState(state, state.title, state.url);
  // rnamePage(state.title);
  loadNew(params);
}
function autoComplete(e) {
  if (!this.value.length > 3) return;
  if (window.timer) {
    clearTimeout(timer);
  }
  window.timer = setTimeout(() => {
    fetch("autocomplete.php?search=" + this.value)
      .then(fetchHandler)
      .then(json)
      .then((res) => {
        console.log(res);
        generCompl(res);
      })
      .catch((error) => {
        console.log(error);
        noticeAll("Код ошибки: " + error.message, 1);
      });
  }, 1000);
}
function focusAutoCompl(e) {
  let auto = document.getElementById("autocomplete");
  auto.style.visibility = "visible";
  auto.classList.add("auto-active");
  this.addEventListener(
    "blur",
    (e) =>
      setTimeout(() => {
        auto.classList.remove("auto-active");
        auto.addEventListener(
          "transitionend",
          () => (auto.style.visibility = "hidden"),
          { once: true }
        );
      }, 300),
    { once: true }
  );
}
(function () {
  loadNew(location.search);
  document.getElementById("js-load_cat").addEventListener("click", loadCat);
  document
    .getElementById("slider__wrapper")
    .addEventListener("click", loadGame);
  document.getElementById("wait_content").addEventListener("click", loadGame);
  document.getElementById("content-js").addEventListener("click", contentHand);
  document.getElementById("search_grid").addEventListener("submit", formSearch);
  document
    .getElementById("search_string")
    .addEventListener("submit", searchWord);
  document.getElementById("string").addEventListener("input", autoComplete);
  document.getElementById("string").addEventListener("focus", focusAutoCompl);
  // document.
})();
window.onpopstate = (e) => {
  loadNew(location.search);
  rnamePage(history.state.title);
  window.scrollTo(0, history.state.xPage);
};
