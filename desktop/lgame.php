<?
require_once "connection.php";
function getSort($sqlreq)
{
  if ($_GET['s'] == "") {
    return $sqlreq;
  }
  $x = $_GET['s'];
  $y = $_GET['st'] == 'desc' || $_GET['st'] == 'asc' ? $_GET['st'] : 'asc';
  $sortAr = array('n' => 'name', 'd' => 'pubdate', 'v' => 'views');
  return $sqlreq .= " ORDER BY `" . $sortAr[$x] . "` " . $y;
}
function getPage($sqlreq)
{
  $num_page = 0;
  global $gamePerPage;
  if (isset($_GET['page'])) {
    $num_page = (int) $_GET['page'] - 1 <= -1 ? 0 : (int) $_GET['page'] - 1;
  }
  if (isset($_GET['s'])) {
    $sqlreq = getSort($sqlreq);
  }
  return $sqlreq .= " LIMIT " . $num_page * $gamePerPage . "," . $gamePerPage . ";";
}
if (isset($_GET['ct'])) {
  $getGame = getPage("SELECT `game`.*,`avg`,SUBSTRING_INDEX(`description`, ' ', 40) AS 'desc',JSON_UNQUOTE(JSON_EXTRACT(`specification_json`, '$.Жанр')) AS 'genre' FROM `game` LEFT JOIN `cat_game` ON `cat_game`.`game_id` = `game`.`game_id` LEFT JOIN `fulldescip` ON `fulldescip`.`game_id` = `game`.`game_id` LEFT JOIN `avg_rating` ON `avg_rating`.`game_id` = `game`.`game_id` WHERE `cat_game`.`cat_id` = " . (int) $_GET['ct']);
  $game = $mysqli->query($getGame);
  if (!$game->num_rows) {
    http_response_code(404);
  }
  echo json_encode($game->fetch_all(), JSON_UNESCAPED_UNICODE);
} elseif (isset($_GET['search'])) {
  $searchReq = $mysqli->real_escape_string($_GET["search"]);
  $getGame = getPage("SELECT `game`.*,`avg`,SUBSTRING_INDEX(`description`, ' ', 40) AS 'desc',JSON_UNQUOTE(JSON_EXTRACT(`specification_json`, '$.Жанр')) AS 'genre' FROM `game` LEFT JOIN `fulldescip` ON `fulldescip`.`game_id` = `game`.`game_id` LEFT JOIN `avg_rating` ON `avg_rating`.`game_id` = `game`.`game_id` WHERE `name` LIKE '%" . $searchReq . "%' OR MATCH(`name`) AGAINST('" . $searchReq . "' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) > 5");
  $game = $mysqli->query($getGame);
  if (!$game->num_rows) {
    http_response_code(404);
  }
  echo json_encode($game->fetch_all(), JSON_UNESCAPED_UNICODE);
} else {
  $getGame = getPage("SELECT `game`.*, `avg`, SUBSTRING_INDEX(`description`,' ',40) AS 'desc', JSON_UNQUOTE(JSON_EXTRACT(`specification_json`, '$.Жанр')) AS 'genre' FROM `game`, `avg_rating`, `fulldescip` WHERE `avg_rating`.`game_id` = `game`.`game_id` AND `fulldescip`.`game_id` = `game`.`game_id`");
  $game = $mysqli->query($getGame);
  if (!$game->num_rows) {
    http_response_code(404);
  }
  echo json_encode($game->fetch_all(), JSON_UNESCAPED_UNICODE);
}

// }
// <div class='content_item'>
//   <div class='img_block'>
//     <img class='img_item' src="{$res[' image']}" alt="{$res[' name']}" />
//     <div class='name_game'>{$res['name']}</div>
//   </div>
//   <div class='info_item'>
//     <div class='block_item'>
//       <div class='genre_item'>Жанр: {$res['genre']}</div>
//       <div class='views'>
//         <svg height='1.2vw' version='1.1' viewBox='0 -25 150 122' width='1.5vw' xmlns='http://www.w3.org/2000/svg'>
//           <use xlink:href='#views'></use>
//         </svg>
//         <span class='view_value'>{$res['views']}</span>
//       </div>
//     </div>
//     <div class='description'>" . strip_tags($res['desc']) . "...</div>
//     <div class='down_link'>
//       <a href='#' class='btn_down'>Скачать</a>
//       <div class='item_value'>
//         <span class='file_size'></span>
//         <span class='rat_icon'>&#9733;</span>
//         <span class='rating'>{$res['downloads']}</span>
//       </div>
//     </div>
//   </div>
// </div>