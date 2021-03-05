<div class="left_content">
  <div class="categorie">
    <h2 class="cat_title">Категории</h2>
    <ul id="js_cat">
      <?
$catArr = [];
$category = $mysqli->query("SELECT `category`.* FROM `category`");
$cat = $category->fetch_all();
// $catArr[$cat['cat_id']] = $cat['cat_name'];
foreach ($cat as $name) {
  echo '<li class="cat_list"><a class="cat_link" href="?ct=' . $name[0] . '">' . $name[1] . '</a></li>';
}
?>
    </ul>
  </div>
</div>