<?
require_once "connection.php";
if (!empty($_POST['rid']) && $_SESSION['auth_flag']) {
  $revid = (int) $_POST['rid'];
  $request = "DELETE FROM `rating` WHERE `id_rev`={$revid}";
  if (!$res = $mysqli->query($request)) {
    http_response_code(501);
  }
}
