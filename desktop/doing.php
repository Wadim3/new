<?
// <!-- <div class="profile__page">
// <div class="top_profile-page">
//   <div class="top_user-left">
//     <div class="top_left-block">
//       <img src="asset/avatar.jpg" alt="wader3301" class="top_left-picture">
//     </div>
//   </div>
//   <div class="top_user-right">
//     <div class="top_right-block">
//       <table class="user_stat-table">
//         <tr class="row-stat">
//           <td class="name-stat">Никнейм:</td>
//           <td class="value-stat">цфывук301</td>
//         </tr>
//         <tr class="row-stat">
//           <td class="name-stat">Просмотрено:</td>
//           <td class="value-stat">5687</td>
//         </tr>
//         <tr class="row-stat">
//           <td class="name-stat">Зашрузок:</td>
//           <td class="value-stat">5678</td>
//         </tr>
//       </table>
//     </div>
//   </div>
// </div>
// <div class="bottom_profile-page">
//   <div class="bott_profile-title">
//     <div data-target="content-favorites" class="title_profile active-title">Избранное</div>
//     <div data-target="content-download" class="title_profile">Загрузки</div>
//     <div data-target="content-views" class="title_profile">История</div>
//   </div>
//   <div class="bott_profile-content">
//     <div class="bott_content-item act_user-menu" id="content-favorites">
//       <div class="item_profile-list">
//         <span class="fil_span" data-url="?art=30"></span>
//         <div class="top-pict_item">
//           <img src="asset/1502223021__cover.png" alt="" class="pict-item">
//         </div>
//         <div class="down-name_item">
//           <span class="game-item">favorites</span>
//         </div>
//       </div>

//       <div class="item_profile-list">
//         <span class="fil_span" data-url="?art=30"></span>
//         <div class="top-pict_item">
//           <img src="asset/1502223021__cover.png" alt="" class="pict-item">
//         </div>
//         <div class="down-name_item">
//           <span class="game-item">Protiofffhtypejxj</span>
//         </div>
//       </div>

//     </div>
//     <div class="bott_content-item" id="content-views">
//       <div class="item_profile-list">
//         <span class="fil_span" data-url="?art=30"></span>
//         <div class="top-pict_item">
//           <img src="asset/1502223021__cover.png" alt="" class="pict-item">
//         </div>
//         <div class="down-name_item">
//           <span class="game-item">Views</span>
//         </div>
//       </div>

//     </div>
//     <div class="bott_content-item" id="content-download">
//       <div class="item_profile-list">
//         <span class="fil_span" data-url="?art=30"></span>
//         <div class="top-pict_item">
//           <img src="asset/1502223021__cover.png" alt="" class="pict-item">
//         </div>
//         <div class="down-name_item">
//           <span class="game-item">download</span>
//         </div>
//       </div>

//     </div>

//   </div>
// </div>
// </div> -->
require_once "connection.php";
switch ($_GET['do']) {
  case 'profile':
    $userStat = [
      "nick" => $_SESSION['user_name'],
      "picture" => $_SESSION['picture'],
    ];
    $now = time();
    $your_date = strtotime($_SESSION['date']);
    $datediff = floor(($now - $your_date) / (60 * 60 * 24));
    $userStat["stat"] = [
      "О себе" => $_SESSION['about'],
      "Избранное" => $_SESSION['favorites'],
      "Просмотренное" => $_SESSION['views'],
      "Оценки" => $_SESSION['rating'],
      "Загрузки" => $_SESSION['download'],
      "На сайте" => $datediff . " дней",
    ];
    echo json_encode($userStat, JSON_UNESCAPED_UNICODE);
    break;
  case 'profi':

    break;
  case 'prof':

    break;
  default:

    break;
}
// Запрос на пелучение данных пользователя в json формате
