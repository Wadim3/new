<?
require_once "connection.php";
$getGame = "SELECT `game`.*, `avg`, SUBSTRING_INDEX(`description`,' ',40) AS 'desc', JSON_UNQUOTE(JSON_EXTRACT(`specification_json`, '$.Жанр')) AS 'genre' FROM `game`, `avg_rating`, `fulldescip` WHERE `avg_rating`.`game_id` = `game`.`game_id` AND `fulldescip`.`game_id` = `game`.`game_id` LIMIT 0, 25";
$game = $mysqli->query($getGame);
while ($res = $game->fetch_assoc()) {
  echo "<div class='content_item'><div class='img_block'><img class='img_item' src='{$res['image']}' alt='{$res['name']}' /><div class='name_game'>{$res['name']}</div></div><div class='info_item'><div class='block_item'><div class='genre_item'>Жанр: {$res['genre']}</div><div class='views'><svg height='1.2vw' version='1.1' viewBox='0 -25 150 122' width='1.5vw' xmlns='http://www.w3.org/2000/svg'><use xlink:href='#views'></use></svg><span class='view_value'>{$res['views']}</span></div></div><div class='description'>" . strip_tags($res['desc']) . "...</div><div class='down_link'><a href='#' class='btn_down'>Скачать</a><div class='item_value'><span class='file_size'></span><span class='rat_icon'>&#9733;</span><span class='rating'>{$res['downloads']}</span></div></div></div></div>";
}