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
function loadNew(params) {
  fetch("lgame.php" + params)
    .then(fetchHandler)
    .then(json)
    .then((res) => {
      let contBlock = document.getElementById("content-js");
      contBlock.append(generCont(res));
      console.log(res);
      pagesReload();
    })
    .catch((error) => {
      noticeAll("Код ошибки:" + error, 1);
      console.error(error);
    });
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
    nameGame.innerText = json[key][1];
    filSpan.setAttribute("data-href", "?art=" + json[key][0]);
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
function pagesReload() {
  let urlParsed = parseURL(location.search);
  let curPage = urlParsed.has("page") ? urlParsed.get("page") : 1;
  if (urlParsed.has("ct")) rebCateg();
  let blockPage = document.getElementById("page-js");
  blockPage.innerHTML = "";
  fetch("count_page.php" + location.search)
    .then(fetchHandler)
    .then(json)
    .then((resJson) => {
      console.log(resJson);
      if (resJson.count == 1) return;
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
        newlink.href = "?" + location.search + "&page=" + i;
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
      newlink.href = "?" + location.search + "&page=" + allPage;
      newlink.innerText = allPage;
      frag.append(newlink);
      blockPage.appendChild(frag);
    })
    .catch((error) => {
      noticeAll("Код ошибки:" + error, 1);
      console.error(error);
    });
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
(function () {
  loadNew(location.search);
})();
window.onpopstate = () => {};
