window.addEventListener('load', function () {

  var showUsers = function (users) {
    var usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '';
    for (var i = 0; i < users.length; i++) {
      usersDiv.innerHTML += '<img src="' + users[i].picSrc + '" ' +
                            'class="user" ' +
                            'onclick="' + users[i].link + '" ' +
                            'title="' +  users[i].username + ' ' + users[i].status +'" ' +
                            'onerror="this.src=\'' + users[i].picOnError + '\'">';
    }
  };

  var showSessions = function (sessions) {
    var sessionsDiv = document.getElementById('sessions');
    sessionsDiv.innerHTML = '';
    for (var i = 0; i < sessions.length; i++) {
      sessionsDiv.innerHTML += '<img src="' + sessions[i].picSrc + '" ' +
                                'class="thumbs" ' +
                                'onclick="' + sessions[i].link + '" ' +
                                'title="' + sessions[i].sessionName + '" ' +
                                'onerror="this.src=\'' + sessions[i].picOnError + '\'">';
    }
  };

  var showLanguages = function (languages) {
    var languagesDiv = document.getElementById('languages');
    languagesDiv.innerHTML = '';
    for (var i = 0; i < languages.length; i++) {
      languagesDiv.innerHTML += '<img src="' + languages[i].picSrc + '" ' +
                                'class="thumbs" ' +
                                'onclick="' + languages[i].link + '" ' +
                                'alt="' + languages[i].languageCode + '" ' +
                                'title="' + languages[i].languageName + '" ' +
                                'onerror="this.src=\'' + languages[i].picOnError + '\'">';
    }
  };

  var showCurUser = function (user) {
    var curUserDivImg = document.querySelector('#curUser .face');
    var curUserDivSpan = document.querySelector('#curUser span');

      curUserDivImg.src = user.picSrc;
      curUserDivImg.onclick = user.link;
      curUserDivImg.title = user.username + ' ' + user.status;
      curUserDivImg.onerror = function () {
        curUserDivImg.src = user.picOnError;
      };

      curUserDivSpan.innerHTML = user.username;
  };

  var options = {
    clockBox: 'clock-box',
    errorBox: 'error-box',
    msgBox: 'msg-box',
    okButton: 'ok-button',
    timedBox: 'timed-box',
    userInput: 'user-input',
    userLabel: 'user-label',
    welcomeMsgBox: 'welcome-box',
    shutdownBox: 'shutdown-btn',
    suspendBox: 'suspend-btn',
    restartBox: 'restart-btn',
    quitBox: 'quit-btn',
    xdmcpBox: 'xdmcp-btn',
    curSessionPicture: 'curSes',
    curLanguageFlag: 'curLan',
    showUsers: showUsers,
    showSessions: showSessions,
    showLanguages: showLanguages,
    showCurUser: showCurUser
  };

  var mdm = new MDM('../../common', options);
  mdm.load(mdm);
  mdm.init();

  var curLanBtn = document.getElementById('curLan').parentNode;
  var languages = document.getElementById('languages');

  var curSesBtn = document.getElementById('curSes').parentNode;
  var sessions = document.getElementById('sessions');

  curLanBtn.addEventListener('click', function () {
    if (!curLanBtn.classList.contains('active')) {
      languages.style.display = 'block';
    } else {
      languages.style.display = 'none';
    }
  });

  curSesBtn.addEventListener('click', function () {
    if (!curSesBtn.classList.contains('active')) {
      sessions.style.display = 'block';
    } else {
      sessions.style.display = 'none';
    }
  });

  languages.style.display = 'none';
  sessions.style.display = 'none';
});
