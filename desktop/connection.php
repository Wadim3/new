<?
$useragent = $_SERVER['HTTP_USER_AGENT'];
if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $useragent) || preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr($useragent, 0, 4))) {
  header('Location: http://new/mobile/index.php');
} else {
  header('Location: http://new/desktop/index.php');
}
ini_set("session.use_strict_mode", 1);
session_start();
// $_SESSION['auth_flag'] = false;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
$host = 'localhost'; // адрес сервера
$database = 'games'; // имя базы данных
$user = 'root'; // имя пользователя
$password = 'root'; // пароль
// mysqli_report(MYSQLI_REPORT_ALL);
$gamePerPage = 20;
$nameSite = "TorrentGame.net";
$nameSite = "ACTorrent.net";
$_SESSION['ip'] = getIp();
setlocale(LC_ALL, 'ru_RU.UTF-8');

$mysqli = new mysqli($host, $user, $password, $database);
if (!$mysqli) {
  die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
$mysqli->set_charset("utf8");
function getIp()
{
  $keys = [
    'HTTP_CLIENT_IP',
    'HTTP_X_FORWARDED_FOR',
    'REMOTE_ADDR',
  ];
  foreach ($keys as $key) {
    if (!empty($_SERVER[$key])) {
      $ip = trim(end(explode(',', $_SERVER[$key])));
      if (filter_var($ip, FILTER_VALIDATE_IP)) {
        return $ip;
      }
    }
  }
}
function multiQuery($reqViews)
{
  global $mysqli;
  if ($mysqli->multi_query($reqViews)) {
    do {
      if ($result = $mysqli->store_result()) {
        $result->free();
      }
    } while ($mysqli->more_results() && $mysqli->next_result());
  }
}
function escStr($str)
{
  global $mysqli;
  return $mysqli->real_escape_string(htmlspecialchars($str));
}
function createHash($hashCre)
{
  return hash("sha256", $hashCre);
}
function userCheck($hash)
{
  global $mysqli;
  $req = "SELECT `user_id` FROM `user_hash` WHERE `hash` = '{$hash}'";
  $resHash = $mysqli->query($req);
  return $resHash->fetch_assoc();
}
function dateRus($date)
{
  $rus_months = array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
  $newDatetime = new Datetime($date);
  $month = $newDatetime->format('n');
  $album_data = $newDatetime->format('d ' . $rus_months[$month - 1] . ' ');
  $album_data .= $newDatetime->format('Y');
  return $album_data;
}
function userSet($hash, $ip)
{
  global $mysqli;
  $req = "INSERT INTO `user_hash` (`user_id`, `hash`, `date`, `ip`, `user_ha`, `register`) VALUES (NULL, '{$hash}', current_timestamp(), '{$ip}', '{$_SERVER['HTTP_USER_AGENT']}', 0);";
  $mysqli->query($req);
  return $mysqli->insert_id;
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
$hash = createHash($_SERVER['HTTP_USER_AGENT'] . getIp());
if ($hash_id = userCheck($hash)) {
  // echo $hash;
  $_SESSION['hash_id'] = $hash_id['hash_id'];
  setcookie("hash", $hash, time() + 60 * 60 * 24 * 3, '/');
} else {
  $_SESSION['hash_id'] = userSet($hash, $_SESSION['ip']);
  setcookie("hash", $hash, time() + 60 * 60 * 24 * 3, '/');
}
require_once "authenfication.php";