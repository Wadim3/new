<div class="bottom_content">
  <h3 class="wait">Самые Ожидаемые Новинки</h3>
  <div id="wait_content">
    <?
$request = "SELECT `name`, `image` FROM `game` ORDER BY `date`, `views` LIMIT 0,5";
$wait = $mysqli->query($request);
while ($res = $wait->fetch_assoc()) {
  echo "<div class='wait__item second_item'><div class='cent__item'><img class='slider__img' src='{$res['image']}' alt='{$res['name']}' /><div class='title_item'>{$res['name']}</div></div></div>";
}
?>
  </div>
</div>