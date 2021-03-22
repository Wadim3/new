<?
require_once "connection.php";
if (isset($_GET["search"])) {
  $search = escStr($_GET["search"]);
  $request = "SELECT `game_id`, `name`, `image` FROM `game` WHERE `name` LIKE '%{$search}%'";
  $game = $mysqli->query($request);
  echo json_encode($game->fetch_all(), JSON_UNESCAPED_UNICODE);
}