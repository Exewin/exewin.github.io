function showElement(ele)
{
	
	var x = document.getElementById(ele);
    if (x.style.display === "none") 
	{
        x.style.display = "block";
    } 
	else 
	{
        x.style.display = "none";
    }
	
}

document.addEventListener('keyup', function (event) 
{
    if (event.defaultPrevented) 
	{
        return;
    }
    var key = event.key || event.keyCode;
    if (key == "`") 
	{
        showElement('console');
		document.getElementById('command').focus();
    }
});
	


function checkKey()
{
	document.getElementById('console').onkeypress = function(e)
	{
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13')
		{
			CMD();
		}
	}
}


var label = "";
label = getCookie("label");
if(label.length!=1)
{
	label="C";
}

var color = "";
color = getCookie("color");
if(color.length!=6)
{
	color="dddddd";
}


function CMD()
{
	//cd upgrade !
	var cmd = document.getElementById('command').value;
	document.getElementById('command').value = "";
	//cd commands
	if(cmd.substring(0,2) == "cd")
	{
		if(cmd == "cd")
		{
			document.getElementById('output').innerHTML = "C:\u005C>"+curDir;
		}
		else if(cmd == "cd." || cmd =="cd .")
		{
			location.reload();
		}
		else if(cmd.substring(2,4) == ".." || cmd.substring(2,5) == " ..")
		{
			if(curDir !="")
			{
				returnBeforeSlash(curDir);
				if(curDir=="other\u005Ccredits")
					window.location.href = "other.html";
				else
					window.location.href = "/"+returnBeforeSlash(curDir)+".html";
			}
			else
				document.getElementById('output').innerHTML = "you are in the root dir";
		}
		else if(cmd.substring(2,3) == "\u005C" || cmd.substring(2,4) == " \u005C")
		{
			if(curDir !="")
				window.location.href = "/index.html";
			else
				document.getElementById('output').innerHTML = "you are in the root dir";
		}
		else
		{
			for(var i=0;i<cds.length;i++)
			{
				if(cmd == "cd "+cds[i])
				{
					window.location.href = cdPaths[i]+".html";
					return;
				}
			}
			document.getElementById('output').innerHTML = "cannot find the path specified, hint: type 'dir'";
		}
	}
	//cls
	else if(cmd == "cls")
	{
		document.getElementById('output').innerHTML = "";
	}
	//cmd
	else if(cmd == "cmd")
	{
		document.getElementById('output').innerHTML = "exewinCMD 1.0 based on Microsoft Windows Command Prompt"
	}
	//date
	else if(cmd == "date")
	{
		var d = new Date()
		document.getElementById('output').innerHTML = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	}
	//dir
	else if(cmd == "dir")
	{
		document.getElementById('output').innerHTML = "";
		document.getElementById('output').innerHTML +=(' &lt;DIR&gt; .<br/>');
		if(curDir!="")
			document.getElementById('output').innerHTML +=(' &lt;DIR&gt; ..<br/>');
		for(var i=0;i<cds.length;i++)
			document.getElementById('output').innerHTML +=(' &lt;DIR&gt; ' + cds[i] + '<br/>');
	}
	//echo
	else if(cmd.substring(0,4) == "echo")
	{
		if(cmd.substring(4,5)==" ")
			document.getElementById('output').innerHTML = cmd.substring(5,cmd.length);
		else
			document.getElementById('output').innerHTML = "Usage: echo [text]";
	}
	//exit & shutdown
	else if(cmd == "exit" || cmd == "shutdown")
	{
		close();
		document.getElementById('output').innerHTML = "not allowed in modern browsers";
	}
	//time
	else if(cmd == "time")
	{
		var d = new Date()
		document.getElementById('output').innerHTML = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+","+d.getMilliseconds();
	}
	//title
	else if(cmd.substring(0,5) == "title")
	{
		if(cmd.substring(5,6)==" ")
		{
			document.title = cmd.substring(6,cmd.length);
			return;
		}
		document.getElementById('output').innerHTML = "Usage: title [text]";
	}
	//ver
	else if(cmd == "ver")
	{
		document.getElementById('output').innerHTML = navigator.appVersion;
	}
	//ipconfig - kinda bullshit
	else if(cmd == "ipconfig")
	{
		document.getElementById('output').innerHTML = location.host;
	}
	//label
	else if(cmd.substring(0,5) == "label")
	{
		if(cmd.substring(5,6)==" ")
		{
			if(cmd.length == 7)
			{
				var l = cmd.substring(6,7);
				if(isLetter(l))
				{
					l = l.toUpperCase();
					setCookie("label",l,10);
					document.getElementById('output').innerHTML = "label changed to "+l+", type 'reset' to reload page";
				}
				else
					document.getElementById('output').innerHTML = "use letter [a-z] or [A-Z]";
			}
			else
				document.getElementById('output').innerHTML = "use one letter";
		}
			else
				document.getElementById('output').innerHTML = "Usage: label [char]";
	}
	//reset&restart
	else if(cmd == "reset" || cmd == "restart")
	{
		location.reload();
	}
	//color
	else if(cmd.substring(0,5) == "color")
	{
		if(cmd.substring(5,6)==" ")
		{
			if(isHexaColor(cmd.substring(6,12)))
			{
				setCookie("color",cmd.substring(6,12),10);
				document.getElementById("jumbotron").style.backgroundColor = "#"+cmd.substring(6,12);
			}
			else
				document.getElementById('output').innerHTML = "Usage: color [rrggbb], eg 'color ffcc99'";
		}
		else
			document.getElementById('output').innerHTML = "Usage: color [rrggbb], eg 'color ffcc99'";
	}
	//help
	else if(cmd == "help")
	{
		document.getElementById('output').innerHTML = "";
		document.getElementById('output').innerHTML +="cd [path]<br/>";
		document.getElementById('output').innerHTML +="cls<br/>";
		document.getElementById('output').innerHTML +="cmd<br/>";
		document.getElementById('output').innerHTML +="date<br/>";
		document.getElementById('output').innerHTML +="dir<br/>";
		document.getElementById('output').innerHTML +="echo [text]<br/>";
		document.getElementById('output').innerHTML +="exit<br/>";
		document.getElementById('output').innerHTML +="shutdown<br/>";
		document.getElementById('output').innerHTML +="time<br/>";
		document.getElementById('output').innerHTML +="title [text]<br/>";
		document.getElementById('output').innerHTML +="ver<br/>";
		document.getElementById('output').innerHTML +="ipconfig<br/>";
		document.getElementById('output').innerHTML +="label [char]<br/>";
		document.getElementById('output').innerHTML +="reset<br/>";
		document.getElementById('output').innerHTML +="restart<br/>";
		document.getElementById('output').innerHTML +="color [rrggbb]<br/>";
	}
	//other
	else
	{
		for(var i=0;i<cds.length;i++)
		{
			if(cmd == cds[i])
			{
				document.getElementById('output').innerHTML = "use 'cd' command, eg 'cd skills' ";
				return;
			}
		}
		document.getElementById('output').innerHTML = "unknown command, type 'help'";
	}
}

function returnBeforeSlash(str)
{
	var s="";
	var b=false;
	for(var i=0;i<str.length;i++)
	{
		if(str.substring(i,i+1)=="\u005C")
		{
			b=true;
			break;
		}
		else
			s+=str.substring(i,i+1);
	}
	if(b)
		return s;
	else
		return "index";
}

function isHexaColor(sNum){
  return (typeof sNum === "string") && sNum.length === 6 
         && ! isNaN( parseInt(sNum, 16) );
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


