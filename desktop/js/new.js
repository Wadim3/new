function fetchHandler(res) {
  if (res.ok) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(new Error(res.status));
  }
}
function text(response) {
  return response.text();
}
function parseURL(url) {
  return new URLSearchParams(url);
}
function loadNew(params) {
  fetch("lgame.php", {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: params,
  })
    .then(fetchHandler)
    .then(text)
    .then((res) => {
      let contBlock = document.getElementById("content-js");
      contBlock.innerHTML = res;
    })
    .catch((error) => {
      noticeAll("Код ошибки:" + error, 1);
    });
}
function pageReload(allPage) {
  let curPage = parseURL(location.search);
  let blockPage = document.getElementById("page-js");
  blockPage.innerHTML = "";
  let frag = document.createDocumentFragment();
  let link = document.createElement("a");
  link.className = "page_num";
  let space = document.createElement("span");
  space.innerText = "...";
  let first = curPage >= 3 ? curPage - 2 : 1;
  let second = allPage - curPage >= 2 ? Number(curPage) + 2 : allPage;
  for (let i = first; i <= second; i++) {
    let newlink = link.cloneNode();
    newlink.href = "?" + location.search + "&page=" + i;
    newlink.innerText = i;
    if (i == curPage) {
      let curP = document.createElement("span");
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
}
function noticeAll(text, type = 0) {
  let arrNotice = [
      ["asset/info.svg", "Новое уведомление", ""],
      ["asset/error.svg", "Произошла ошибка", "error"],
    ],
    frag = document.createDocumentFragment(),
    hr = document.createElement("hr"),
    block = document.createElement("div"),
    stat = document.createElement("div"),
    textStat = document.createElement("div"),
    img = document.createElement("img"),
    textElem = document.createElement("div");
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
