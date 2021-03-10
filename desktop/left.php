<div class="left_content">
  <div class="categorie">
    <h2 class="cat_title">Категории</h2>
    <div class="all_game">Все игры</div>
    <ul id="js_cat">
      <?
$category = $mysqli->query("SELECT `category`.* FROM `category`");
$cat = $category->fetch_all();
foreach ($cat as $name) {
  echo '<li class="cat_list"><a class="cat_link" data-url="ct=' . $name[0] . '" href="?ct=' . $name[0] . '">' . $name[1] . '</a></li>';
}
?>
    </ul>
  </div>
</div>