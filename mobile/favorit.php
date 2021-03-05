<?
require_once 'connection.php';
if (isset($_POST['art']) && $_SESSION['auth_flag']) {
  $resArr = [];
  $request = "SELECT `game_id` FROM `favorites` WHERE `game_id`= " . $_SESSION['this_game'] . " AND `user_id`= " . $_SESSION['user_id'];
  $res = $mysqli->query($request);
  if ($res->num_rows) {
    $request = "DELETE FROM `favorites` WHERE `game_id`= " . $_SESSION['this_game'] . " AND `user_id`= " . $_SESSION['user_id'];
    if (!$mysqli->query($request)) {
      http_response_code(500);
    } else {
      $resArr["act"] = "DELETE";
      echo "<div id='favorit-res_json' class='DELETE'></div>";
    }
  } else {
    $request = "INSERT INTO `favorites`(`game_id`, `user_id`, `date`) VALUES ({$_SESSION['this_game']}, {$_SESSION['user_id']}, current_timestamp())";
    if (!$mysqli->query($request)) {
      http_response_code(500);
    } else {
      $resArr["act"] = "INSERT";
      echo "<div id='favorit-res_json' class='INSERT'></div>";
    }
  }
}
