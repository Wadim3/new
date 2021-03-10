<div class="right_content">
  <div class="cont_cent">
    <div class="title_categorie">
      <div class="cat_name">
        <h3>Categorie name</h3>
      </div>
      <div class="switch_btn">
        <span class="line_view">
          <svg class="anim_view" onclick="lineView()" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.1vw"
            height="1vw" viewBox="0 0 32 32">
            <use xlink:href="#line_view"></use>
          </svg>
        </span>
        <span class="table_view"><svg class="anim_view" onclick="tableView()" version="1.1"
            xmlns="http://www.w3.org/2000/svg" width="1.1vw" height="1vw" viewBox="0 0 34 34">
            <use xlink:href="#table_view"></use>
          </svg>
        </span>
      </div>
    </div>
    <div class="search">
      <form class="search_grid" action="" method="GET">
        <select class="search_item select-css first_line_item" name="sort" id="search-sort" size="1">
          <option value="name">По имени</option>
          <option value="date">По дате</option>
          <option value="rating" selected>По рейтингу</option>
          <option value="popular">По просмотрам</option>
        </select>
        <select class="search_item select-css first_line_item" name="search-categorie" id="search-cat" size="1">
          <option class="opt-cat" value>Категория</option>
          <?
foreach ($cat as $name) {
  echo '<option class="opt-cat" value="' . $name[1] . '">' . $name[1] . '</option>';
}
?>
        </select>
        <select class="search_item select-css first_line_item" name="language" id="search-language">
          <option value>Язык Озвучки</option>
          <option value="russian">Русский</option>
          <option value="english">Английский</option>
          <option value="other">Другое</option>
        </select>

        <div id="slider_year" class="pub_year"></div>

        <input class="btn_search" type="submit" value="Поиск" />
      </form>
    </div>
    <div id="content-js" class="block_content">
    </div>
    <div id="page-js" class="page">
    </div>
  </div>
</div>