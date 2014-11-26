function MDM (commonDir, options) {

  var self = this;

  this.commonDir = commonDir;

  this.clockBox = options.clockBox;
  this.errorBox = options.errorBox;
  this.msgBox = options.msgBox;
  this.okButton = options.okButton;
  this.timedBox = options.timedBox;
  this.userInput = options.userInput;
  this.userLabel = options.userLabel;
  this.welcomeMsgBox = options.welcomeMsgBox;
  this.shutdownBox = options.shutdownBox;
  this.suspendBox = options.suspendBox;
  this.restartBox = options.restartBox;
  this.quitBox = options.quitBox;
  this.xdmcpBox = options.xdmcpBox;
  this.curSessionPicture = options.curSessionPicture;
  this.curLanguageFlag = options.curLanguageFlag;
  this.showUsers = options.showUsers;
  this.showSessions = options.showSessions;
  this.showLanguages = options.showLanguages;
  this.showCurUserCb = options.showCurUser;

  this.users = [];
  this.sessions = [];
  this.languages = [];

  document.getElementById(this.userInput).addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      self.sendLogin();
    }
  });

  document.getElementById(this.curSessionPicture).src = this.commonDir + '/img/sessions/default.svg';

  // Called by MDM to enable user input
  this.enable = function () {
    document.getElementById(this.userInput).value = '';
		document.getElementById(this.userInput).disabled = false;
		document.getElementById(this.okButton).disabled = false;
  };

  // Called by MDM to disable user input
  this.disable = function () {
    document.getElementById(this.userInput).value = 'disabled';
		document.getElementById(this.userInput).disabled = 'disabled';
		document.getElementById(this.okButton).disabled = 'disabled';
  };

  // Called by MDM to set the welcome message
  this.setWelcomeMessage = function (message) {
		document.getElementById(this.welcomeMsgBox).innerHTML = message;
	};

  // Called by MDM to update the clock
	this.setClock = function (message) {
		document.getElementById(this.clockBox).innerHTML = message;
	};

  // Called by MDM to allow the user to input a username
	this.prompt = function (message) {
		this.enable();
		document.getElementById(this.userLabel).innerHTML = message;
		document.getElementById(this.userInput).value = '';
		document.getElementById(this.userInput).type = 'text';
		document.getElementById(this.userInput).focus();
	}

	// Called by MDM to allow the user to input a password
	this.noEcho = function (message) {
		this.enable();
		document.getElementById(this.userLabel).innerHTML = message;
		document.getElementById(this.userInput).value = '';
		document.getElementById(this.userInput).type = 'password';
		document.getElementById(this.userInput).focus();
	};

	// Called by MDM to show a message (usually 'Please enter your username')
	this.msg = function (message) {
		document.getElementById(this.msgBox).innerHTML = message;
	}

	// Called by MDM to show a timed login countdown
	this.timed = function (message) {
		if (message != '') {
			document.getElementById(this.timedBox).style.display = 'block';
		}
		else {
			document.getElementById(this.timedBox).style.display = 'none';
		}
		document.getElementById(this.timedBox).innerHTML = message;
	};

	// Called by MDM to show an error
	this.error = function (message) {
		if (message != '') {
			document.getElementById(this.errorBox).style.display = 'block';
		}
		else {
			document.getElementById(this.errorBox).style.display = 'none';
		}
		document.getElementById(this.errorBox).innerHTML = message;
	};

	// Called by MDM to add a user to the list of users
	this.addUser = function (username, gecos, status) {

		var link = 'javascript:alert(\'USER###'+username+'\');mdm_set_current_user(\'' + username + '\');';
    var picSrc = 'file:///home/'+username+'/.face';
    var picOnError = 'file:///usr/share/pixmaps/nobody.png';

    this.users.push({
      username: username,
      gecos: gecos,
      status: status,
      link: link,
      picSrc: picSrc,
      picOnError: picOnError
    });

		this.showUsers(this.users);
	};

	// Called by MDM to add a session to the list of sessions
	this.addSession = function (session_name, session_file) {

		session_name = session_name.replace('Ubuntu', 'Unity');

		var filename = session_name.toLowerCase();
		filename = filename.replace(/ /g, '-');
		filename = filename.replace(/\(/g, '');
		filename = filename.replace(/\)/g, '');

		var link = 'javascript:alert(\'SESSION###' + session_name + '###' + session_file + '\');select_session(\''+
  		session_name + '\',\''+session_file+'\');';
		var picSrc = this.commonDir + '/img/sessions/'+filename+'.svg';
		var picOnError = this.commonDir + '/img/sessions/default.svg';

		this.sessions.push({
      sessionName: session_name,
      link: link,
      picSrc: picSrc,
      picOnError: picOnError
    });

		this.showSessions(this.sessions);
	};

	// Called by MDM to add a language to the list of languages
	this.addLanguage = function (language_name, language_code) {

		var filename = language_code.toLowerCase();
		filename = filename.replace('.utf-8', '');
		bits = filename.split('_');
		if (bits.length == 2) {
			filename = bits[1];
		}

		var link = 'javascript:alert(\'LANGUAGE###'+language_code+'\')';
		var picSrc = this.commonDir + '/img/languages/'+filename+'.png';
		var picOnError = this.commonDir + '/img/languages/generic.png';

		this.languages.push({
      languageName: language_name,
      languageCode: language_code,
      link: link,
      picSrc: picSrc,
      picOnError: picOnError
    });

	  this.showLanguages(this.languages);
	};

	// Called by MDM if the SHUTDOWN command shouldn't appear in the greeter
	this.hideShutdown = function () {
	  if (this.shutdownBox) {
  		document.getElementById(this.shutdownBox).style.display = 'none';
    }
	};

	// Called by MDM if the SUSPEND command shouldn't appear in the greeter
	this.hideSuspend = function () {
	  if (this.suspendBox) {
  		document.getElementById(this.suspendBox).style.display = 'none';
    }
	};

	// Called by MDM if the RESTART command shouldn't appear in the greeter
	this.hideRestart = function () {
	  if (this.restartBox) {
  		document.getElementById(this.restartBox).style.display = 'none';
    }
	};

	// Called by MDM if the QUIT command shouldn't appear in the greeter
	this.hideQuit = function () {
	  if (this.quitBox) {
  		document.getElementById(this.quitBox).style.display = 'none';
    }
	};

	// Called by MDM if the XDMCP command shouldn't appear in the greeter
	this.hideXdmcp = function () {
	  if (this.xdmcpBox) {
  		document.getElementById(this.xdmcpBox).style.display = 'none';
    }
	};

	// Call in the page when the user select a session
	this.selectSession = function (session_name, session_file) {
		var filename = session_name.toLowerCase();
		filename = filename.replace(/ /g, '-');
		filename = filename.replace(/\(/g, '');
		filename = filename.replace(/\)/g, '');
		document.getElementById(this.curSessionPicture).src = this.commonDir + '/img/sessions/'+filename+'.svg';
		document.getElementById(this.curSessionPicture).title = session_name;
		document.getElementById(this.curSessionPicture).width = 16;
	};

	// Call in the page when the user select a language
	this.setCurrentLanguage = function (language_name, language_code)	{
		var filename = language_code.toLowerCase();
		filename = filename.replace('.utf-8', '');
		bits = filename.split('_');
		if (bits.length == 2) {
			filename = bits[1];
		}
		document.getElementById(this.curLanguageFlag).src = this.commonDir + '/img/languages/'+filename+'.png';
		document.getElementById(this.curLanguageFlag).title = language_name;
		document.getElementById(this.curLanguageFlag).width = 16;
	};

	// Call in the page when the user select a user
	this.showCurUser = function (username) {
	  for (var i = 0; i < this.users.length; i++) {
	    if (this.users[i].username === username) {
    		this.showCurUserCb(this.users[i]);
	    }
	  }
	};

	this.sendLogin = function () {
		var value = document.getElementById(this.userInput).value;
		mdm_disable();
		alert('LOGIN###' + value);
		return false;
	};

  // Add all functions called by mdm to window
	this.load = function () {
	  window.mdm_disable = this.disable.bind(this);
		window.mdm_enable = this.enable.bind(this);
		window.mdm_prompt = this.prompt.bind(this);
		window.mdm_noecho = this.noEcho.bind(this);
		window.mdm_msg = this.msg.bind(this);
		window.mdm_timed = this.timed.bind(this);
		window.mdm_error = this.error.bind(this);
    window.mdm_add_user = this.addUser.bind(this);
		window.mdm_add_session = this.addSession.bind(this);
		window.mdm_add_language = this.addLanguage.bind(this);
		window.mdm_hide_shutdown = this.hideShutdown.bind(this);
    window.mdm_hide_suspend = this.hideSuspend.bind(this);
    window.mdm_hide_restart = this.hideRestart.bind(this);
    window.mdm_hide_quit = this.hideQuit.bind(this);
    window.mdm_hide_xdmcp = this.hideXdmcp.bind(this);
    window.mdm_set_current_language = this.setCurrentLanguage.bind(this);
    window.mdm_set_current_user = this.showCurUser.bind(this);

		window.set_clock = this.setClock.bind(this);
    window.select_session = this.selectSession.bind(this);
		window.set_welcome_message = this.setWelcomeMessage.bind(this);
		window.send_login = this.sendLogin.bind(this);
	};

	this.init = function () {
		document.getElementById(this.errorBox).style.display = 'none';
		document.getElementById(this.timedBox).style.display = 'none';
		document.getElementById(this.curSessionPicture).width = 16;

		document.getElementById(this.shutdownBox).addEventListener('click', function () {
		  window.alert('FORCE-SHUTDOWN###');
		});
		document.getElementById(this.suspendBox).addEventListener('click', function () {
		  window.alert('FORCE-SUSPEND###');
		});
		document.getElementById(this.restartBox).addEventListener('click', function () {
		  window.alert('FORCE-RESTART###');
		});
	};

}
