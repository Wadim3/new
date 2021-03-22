<header>
  <div class="head_search">
    <div class="inner_header">
      <img class="icon_site" src="asset/hotpng.com.png" alt="mySite" />
      <div class="str_search">
        <form id="search_string">
          <input id="string" name="search" type="text" value="<?echo htmlspecialchars($_GET['search']) ?>"
            placeholder="Искать здесь..." autocomplete="off" />
          <button id="btn_string" type="submit">
            <svg class="search_icon" fill="#bd2c2c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px"
              height="20px">
              <path
                d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </button>
          <div id="autocomplete" class="auto-hidden" style="visibility:hidden;">
            <div class="auto-item">
              <span class="fil_span" data-url="?art=4"></span>
              <div class="auto-left">
                <img src="https://s1.torrents-igruha.org/uploads/posts/2019-06/1560267004__cover.jpg" alt=""
                  class="auto-img">
              </div>
              <div class="auto-right">
                <span class="auto-name">Watch Dogs Legion
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="for_user">
        <div class="menu-for"><img tabindex="-1" src="asset/user.svg" alt="" class="img-user"></div>
        <div class="for-reg_login">
          <div class="top_menu-user">
            <span id="login__menu" class="tit-user_menu">Войти</span>
            <span id="register__menu" class="tit-user_menu">Регистрация</span>
          </div>
          <div class="block-us_menu">
            <div class="register">
              <form class="form-for-reg" action="" id="register">
                <input placeholder="Никнейм" class="input-user" type="text" name="nick" id="rnick">
                <input placeholder="Email" class="input-user" type="email" name="mail" id="email">
                <div class="block-pass">
                  <input placeholder="Пароль" class="input-user" type="password" name="pass" id="rpass">
                  <label class="check-lab"><input type="checkbox" class="pass-check"> Показать пароль</label>
                </div>
                <input class="input-user" type="submit" value="Регистрация">
              </form>
            </div>
            <div class="login" style="display:none;">
              <form class="form-for-reg" action="" id="login">
                <input class="input-user" type="text" name="nick" id="lnick">
                <div class="block-pass">
                  <input class="input-user" type="password" name="pass" id="lpass">
                  <label class="check-lab"><input type="checkbox" class="pass-check"> Показать пароль</label>
                </div>
                <input class="input-user" type="submit" value="Войти">
              </form>
            </div>
          </div>
        </div>
        <div class="user_authorized">
        </div>
      </div>
    </div>
  </div>
</header>