<?
require_once "connection.php";
function calcPage($all)
{
  global $gamePerPage;
  return ceil($all / $gamePerPage);
}
$arrPage = [];
if (isset($_GET['ct'])) {
  $countReq = "SELECT COUNT(`game`.`game_id`) AS 'count' FROM `game` LEFT JOIN `cat_game` ON `cat_game`.`game_id` = `game`.`game_id` WHERE `cat_game`.`cat_id` = " . (int) $_GET['ct'];
  $res = $mysqli->query($countReq);
  $result = $res->fetch_assoc();
  $arrPage['count'] = calcPage($result['count']);
} elseif (isset($_GET['search'])) {
  $countReq = "SELECT COUNT(`game`.`game_id`) AS 'count' FROM `game` WHERE `name` LIKE '%" . $searchReq . "%' OR MATCH(`name`) AGAINST('" . $searchReq . "' IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) > 5";
  $res = $mysqli->query($countReq);
  $result = $res->fetch_assoc();
  $arrPage['count'] = calcPage($result['count']);
} else {
  $countReq = "SELECT COUNT(`game_id`) AS 'count' FROM `game`";
  $res = $mysqli->query($countReq);
  $result = $res->fetch_assoc();
  $arrPage['count'] = calcPage($result['count']);
}
echo json_encode($arrPage);