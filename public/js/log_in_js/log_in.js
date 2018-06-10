        var log_global = {
            state:"",
            security_username:"",
        }

        var change_global = {
            state:"",
            msg:"",
        }

        function time() {
            let time_div = document.getElementById('showtime');
            let now = new Date();
            time_div.innerHTML = now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日"+now.getHours()+"时"+now.getMinutes()+"分"+now.getSeconds()+"秒";
            setTimeout(time, 1000);
        }

        function log() {
            alert('请输入用户名和密码');
            return;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username.length == 0 || password.length == 0) {
                alert('请输入用户名和密码');
                return;
            }
            else {
                window.location.href="index.html";
                return;

                info = {'username':username, 'password':password}
                text = JSON.stringify( info );

                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST","/account_user_login",true);
                xmlhttp.setRequestHeader("Content-type","application/json");
                xmlhttp.send(text);

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var temp = JSON.parse( xmlhtttp.responseText );
			            log_global.state = temp.site[0].state;
			            log_global.security_username = temp.site[1].security_username;
			            if (log_global.state == 'true') {
			                window.location.href="index.html";
                            return;
			            }
			            else
			                alert('账号或密码错误！');
                    }
                }
            }
        }

        function  change() {
		    alert('ppppppp');
            var oldpswd = document.getElementById('oldpswd').value;
            var newpswd1 = document.getElementById('newpswd1').value;
            var newpswd2 = document.getElementById('newpswd2').value;

            if (newpswd1 != newpswd2)
                alert('输入的新密码不一致！');
            else {
                info  = {'username':log_global.security_username, 'password':oldpswd, 'new_password':newpswd1};
                text = JSON.stringify( info );

                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST","/change_password",true);
                xmlhttp.setRequestHeader("Content-type","application/json");
                xmlhttp.send(text);

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var temp = JSON.parse( xmlhtttp.responseText );
			            change_global.state = temp.site[0].state;
			            change_global.msg = temp.site[1].msg;
			            if (change_global.state == 'true') {
			                alert( change_global.msg );
			            }
                    }
                }
            }
		}

//        function setcookie( str1 ) {
//			var temp = JSON.parse(str1);
//			log_global.state = temp.site[0].state;
//			log_global.security_username = temp.site[1].security_username;
//        }
//        function getcookie( str1 ) {
//        	if (document.cookie.length > 0) {
//        		start = document.cookie.indexOf(str1 + "=");
//        		if (start != -1) {
//    				start = start + str1.length + 1;
//   					end = document.cookie.indexOf(";", start);
//    				if (end == -1)
//    					end = document.cookie.length;
//    				return unescape( document.cookie.substring(start, end) );
//    			}
//    		}
//    		return "";
//        }
//		function checkcookie( str1 ) {
//			res = getcookie( str1 )
//			if (username != null && username != "")
//				return true;
//			else
//  			return false;
//		}

