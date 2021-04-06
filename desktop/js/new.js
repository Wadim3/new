!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self),
      (function () {
        var n = e.Cookies,
          r = (e.Cookies = t());
        r.noConflict = function () {
          return (e.Cookies = n), r;
        };
      })());
})(this, function () {
  "use strict";
  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) e[r] = n[r];
    }
    return e;
  }
  var t = {
    read: function (e) {
      return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function (e) {
      return encodeURIComponent(e).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    },
  };
  return (function n(r, o) {
    function i(t, n, i) {
      if ("undefined" != typeof document) {
        "number" == typeof (i = e({}, o, i)).expires &&
          (i.expires = new Date(Date.now() + 864e5 * i.expires)),
          i.expires && (i.expires = i.expires.toUTCString()),
          (t = encodeURIComponent(t)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape)),
          (n = r.write(n, t));
        var c = "";
        for (var u in i)
          i[u] &&
            ((c += "; " + u), !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
        return (document.cookie = t + "=" + n + c);
      }
    }
    return Object.create(
      {
        set: i,
        get: function (e) {
          if ("undefined" != typeof document && (!arguments.length || e)) {
            for (
              var n = document.cookie ? document.cookie.split("; ") : [],
                o = {},
                i = 0;
              i < n.length;
              i++
            ) {
              var c = n[i].split("="),
                u = c.slice(1).join("=");
              '"' === u[0] && (u = u.slice(1, -1));
              try {
                var f = t.read(c[0]);
                if (((o[f] = r.read(u, f)), e === f)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        },
        remove: function (t, n) {
          i(t, "", e({}, n, { expires: -1 }));
        },
        withAttributes: function (t) {
          return n(this.converter, e({}, this.attributes, t));
        },
        withConverter: function (t) {
          return n(e({}, this.converter, t), this.attributes);
        },
      },
      {
        attributes: { value: Object.freeze(o) },
        converter: { value: Object.freeze(r) },
      }
    );
  })(t, { path: "/" });
});
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
  //   generHand(sessionStorage.getItem(params), params, contBlock);
  //   pagesReload();
  //   return;
  // }
  fetch("lgame.php" + params)
    .then(fetchHandler)
    .then(text)
    .then((res) => {
      contBlock.innerHTML = "";
      // if (sessionStorage.getItem(params) === null) {
      //   sessionStorage.setItem(params, res);
      // }
      generHand(res, params, contBlock);
      pagesReload();
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
    baguetteBox.run(".content-screenshot");
  } else if (url.has("do")) {
    if (url.get("do") == "profile") {
      bl.append(generProfile(json));
      loadUlist("favorites", 1);
      loadUlist("views", 1);
      loadUlist("download", 1);
    }
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
      filSpan = create("span", "fil_span"),
      favSet = create("div", "fav_set-block");
    favSet.innerHTML =
      "<svg onclick='favoritSet(this)' class='fav_set-pict dislike' version='1.1' id='favorit-svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 412.735 412.735' style='enable-background:new 0 0 412.735 412.735;' xml:space='preserve'><path id='favorit-path' class='review_path' d='M295.706,46.058C354.45,46.344,402,93.894,402.286,152.638 c0,107.624-195.918,214.204-195.918,214.204S10.449,258.695,10.449,152.638c0-58.862,47.717-106.58,106.58-106.58l0,0 c36.032-0.281,69.718,17.842,89.339,48.065C226.123,64.047,259.722,45.971,295.706,46.058z'></path><path id='svg-like' class='favoth__path' d='M206.367,377.291c-1.854-0.024-3.664-0.567-5.224-1.567C193.306,371.544,0,263.397,0,152.638 C0,88.005,52.395,35.609,117.029,35.609l0,0c34.477-0.406,67.299,14.757,89.339,41.273 c41.749-49.341,115.591-55.495,164.932-13.746c26.323,22.273,41.484,55.02,41.436,89.501 c0,112.327-193.306,218.906-201.143,223.086C210.031,376.723,208.221,377.266,206.367,377.291z M117.029,56.507 c-53.091,0-96.131,43.039-96.131,96.131l0,0c0,89.861,155.167,184.424,185.469,202.188 c30.302-17.241,185.469-111.282,185.469-202.188c0.087-53.091-42.881-96.201-95.972-96.289 c-32.501-0.053-62.829,16.319-80.615,43.521c-3.557,4.905-10.418,5.998-15.323,2.44c-0.937-0.68-1.761-1.503-2.44-2.44 C179.967,72.479,149.541,56.08,117.029,56.507z'></path></svg>";
    imgItem.src = json[key][5];
    imgItem.alt = json[key][1];
    imgItem.onerror = function () {
      this.src = "asset/err_image.svg";
    };
    nameGame.innerText = json[key][1];
    filSpan.setAttribute("data-url", "?art=" + json[key][0]);
    imgBlock.append(filSpan, favSet, imgItem, nameGame);
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
function generProfile(json) {
  console.log(json);
  let frag = document.createDocumentFragment();
  let profile = create("div", "profile__page");
  let top = create("div", "top_profile-page");
  let left = create("div", "top_user-left");
  let lblock = create("div", "top_left-block");
  let img = create("img", "top_left-picture");
  let stat = json.stat;
  img.src = json.picture;
  img.alt = json.nick;
  lblock.append(img);
  left.append(lblock);
  window.json = json;
  let right = create("div", "top_user-right");
  let rblock = create("div", "top_right-block");
  let table = create("table", "user_stat-table");
  let tr = create("tr", "row-stat");
  tr.innerHTML =
    "<td class='name-stat'>Никнейм: </td><td class='value-stat'>" +
    json.nick +
    "</td>";
  table.append(tr);
  for (const key in stat) {
    if (Object.hasOwnProperty.call(stat, key)) {
      const element = stat[key];
      let tr = create("tr", "row-stat");
      tr.innerHTML =
        "<td class='name-stat'>" +
        key +
        ": </td><td class='value-stat'>" +
        element +
        "</td>";
      console.log(tr.innerHTML);
      table.append(tr);
    }
  }
  rblock.append(table);
  right.append(rblock);
  top.append(left, right);
  let bottom = create("div", "bottom_profile-page");
  let title = create("div", "bott_profile-title");
  title.innerHTML =
    "<div data-target='content-favorites' class='title_profile active-title'>Избранное</div><div data-target='content-download' class='title_profile'>Загрузки</div><div data-target='content-views' class='title_profile'>История</div>";
  title.addEventListener("click", handUser);
  let content = create("div", "bott_profile-content");
  let favorites = create("div", "bott_content-item act_user-menu");
  favorites.id = "content-favorites";
  let views = create("div", "bott_content-item");
  views.id = "content-views";
  let download = create("div", "bott_content-item");
  download.id = "content-download";
  content.append(favorites, views, download);
  bottom.append(title, content);
  profile.append(top, bottom);
  frag.append(profile);
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
      let link = create("a");
      console.log(element);
      link.href = element.replace("thumbs/", "");
      link.setAttribute("data-caption", thisjson[5]);
      screenItem.src = element;
      screenItem.alt = key + " Скриншот";
      link.append(screenItem);
      contScreen.append(link);
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
        "<div class='filter'></div><div class='yo_icon'><img onclick='loadYoutube(this)' class='play_icon' src='asset/play__icons.svg'></div>";
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
    rnamePage("");
  } else if (urlParsed.toString() == "") {
    rnamePage("Все игры" + pageStr);
  }
  let curPage = pages ? pages : 1;
  if (urlParsed.has("ct")) rebCateg();
  let blockPage = document.getElementById("page-js");
  blockPage.innerHTML = "";
  fetch("countpage.php" + location.search)
    .then(fetchHandler)
    .then(text)
    .then((resJson) => {
      resJson = JSON.parse(resJson);
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
function generList(json) {
  let frag = document.createDocumentFragment();
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const element = json[key];
      let item = create("div", "item_profile-list");
      let fil = create("span", "fil_span");
      fil.setAttribute("data-url", "?art=" + element[2]);
      let pict = create("div", "top-pict_item");
      let img = create("img", "pict-item");
      img.src = element[0];
      img.alt = element[1];
      pict.append(img);
      let nameItem = create("div", "down-name_item");
      let game = create("span", "game-item");
      game.innerText = element[1];
      nameItem.append(game);
      item.append(fil, pict, nameItem);
      frag.append(item);
    }
  }
  return frag;
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

function userMenu(e) {
  let tar = e.target;
  if (tar.classList.contains("tit-user_menu")) {
    document.querySelector(".active-tit").classList.remove("active-tit");
    tar.classList.add("active-tit");
    if (tar.id == "login__menu") {
      document.querySelector(".register").classList.remove("active-menu");
      document.querySelector(".login").classList.add("active-menu");
    } else if (tar.id == "register__menu") {
      document.querySelector(".login").classList.remove("active-menu");
      document.querySelector(".register").classList.add("active-menu");
    }
  }
}
function openMenu(e) {
  let block = this.classList.contains("login-true")
    ? document.querySelector(".user_authorized")
    : document.querySelector(".for-reg_login");
  if (this.classList.contains("img-act-js")) {
    block.classList.remove("img-active");
    this.classList.remove("img-act-js");
  } else {
    block.classList.add("img-active");
    this.classList.add("img-act-js");
  }
}
function loadYoutube(elem) {
  let yout = elem.parentElement.parentElement;
  let videoId = yout.id;
  yout.innerHTML =
    '<iframe class="iframe" id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/' +
    videoId +
    '?autoplay=1&end=180" frameborder="0" allowfullscreen></iframe>';
}
function showPass(elem) {
  let inpPass = elem.previousElementSibling;
  if (elem.classList.contains("off")) {
    elem.classList.remove("off");
    inpPass.type = "text";
  } else {
    elem.classList.add("off");
    inpPass.type = "password";
  }
}

function handUser(e) {
  let tar = e.target;
  if (!tar.matches(".title_profile:not(.active-title)")) return;
  this.querySelector(".active-title").classList.remove("active-title");
  document.querySelector(".act_user-menu").classList.remove("act_user-menu");
  document
    .getElementById(tar.getAttribute("data-target"))
    .classList.add("act_user-menu");
  tar.classList.add("active-title");
}
function sendAuth(e) {
  e.preventDefault();
  let form = new FormData(this);
  fetch("auth.php", { method: "POST", body: form })
    .then(fetchHandler)
    .then(json)
    .then((res) => {
      console.log(res);
      let img = document.getElementById("img_user-js");
      img.click();
      img.src = res.picture;
      img.classList.add("login-true");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
function loadProfile(e) {
  let name = document.getElementById("usnick");
  if (!name) return;

  let state = {
    url: "?do=profile",
    title: name.innerText,
    xPage: window.pageYOffset || document.documentElement.scrollTop,
  };
  history.pushState(state, state.title, state.url);
  loadNew("?do=profile");
}
function loadUlist(list, page) {
  fetch("user_list.php?" + list + "=" + page)
    .then(fetchHandler)
    .then(text)
    .then((res) => {
      let result = JSON.parse(res);
      console.log(result);
      let block = document.getElementById("content-" + list);
      block.append(generList(result));
    })
    .catch((err) => {
      console.log(err);
    });
}
function exitProfile(e) {
  fetch("exit.php")
    .then(fetchHandler)
    .then((res) => {
      let profile = document.getElementById("img_user-js");
      Cookies.remove("_uida");
      Cookies.remove("_uide");
      profile.classList.remove("login-true");

      profile.src = "asset/user.svg";
      document.getElementById("usnick").innerText = "";
      if (location.search == "?do=profile") {
        location.href = "http://new/desktop";
      }
    })
    .catch((err) => {
      noticeAll("Код ошибки: " + err.message, 1);
      console.error(err);
    });
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
  document.getElementById("user-hand-js").addEventListener("click", userMenu);
  document.getElementById("img_user-js").addEventListener("click", openMenu);
  document.getElementById("register").addEventListener("submit", sendAuth);
  document.getElementById("login").addEventListener("submit", sendAuth);
  document
    .getElementById("profile-link")
    .addEventListener("click", loadProfile);
  document.getElementById("exit-link").addEventListener("click", exitProfile);
})();
window.onpopstate = (e) => {
  loadNew(location.search);
  rnamePage(history.state.title);
  window.scrollTo(0, history.state.xPage);
};
function favoritSet(tar) {
  fetch("favorit.php", {
    method: "post",
    body: parseURL(location.search),
  })
    .then(fetchHandler)
    .then(text)
    .then((res) => {
      let favIcon = document.getElementById("favorit-svg");
      let blockres = document.getElementById("favorit-res_json");
      if (blockres.classList.contains("INSERT")) {
        favIcon.classList.remove("dislike");
        favIcon.classList.add("like");
      } else if (blockres.classList.contains("DELETE")) {
        favIcon.classList.add("dislike");
        favIcon.classList.remove("like");
      }
    });
}
