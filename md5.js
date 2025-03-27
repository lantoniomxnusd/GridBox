// SHA-256 Hash Function (More Secure Alternative)
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
}

// MD5 Hash Function (For Non-Secure Uses)
function md5(string) {
  function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
  }
  function rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
  }
  function cmn(q, a, b, x, s, t) {
      return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  function coreMD5(x) {
      var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
          var olda = a, oldb = b, oldc = c, oldd = d;
          a = ff(a, b, c, d, x[i+ 0],  7, -680876936);
          d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
          c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
          b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
          a = ff(a, b, c, d, x[i+ 4],  7, -176418897);
          d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
          c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
          b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
          a = ff(a, b, c, d, x[i+ 8],  7,  1770035416);
          d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
          c = ff(c, d, a, b, x[i+10], 17, -42063);
          b = ff(b, c, d, a, x[i+11], 22, -1990404162);
          a = ff(a, b, c, d, x[i+12],  7,  1804603682);
          d = ff(d, a, b, c, x[i+13], 12, -40341101);
          c = ff(c, d, a, b, x[i+14], 17, -1502002290);
          b = ff(b, c, d, a, x[i+15], 22,  1236535329);
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
      }
      return [a, b, c, d];
  }
  function str2binl(str) {
      var nblk = ((str.length + 8) >> 6) + 1, blks = new Array(nblk * 16);
      for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
      for (i = 0; i < str.length; i++)
          blks[i>>2] |= (str.charCodeAt(i) & 0xFF) << ((i%4) * 8);
      blks[i>>2] |= 0x80 << ((i%4) * 8);
      blks[nblk*16-2] = str.length * 8;
      return blks;
  }
  function binl2hex(binarray) {
      var hex_tab = "0123456789abcdef", str = "";
      for (var i = 0; i < binarray.length * 4; i++) {
          str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                 hex_tab.charAt((binarray[i>>2] >> ((i%4)*8)) & 0xF);
      }
      return str;
  }
  return binl2hex(coreMD5(str2binl(string)));
}

// Handle Login Form Submission
document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", async function(event) {
          event.preventDefault();
          let passwordInput = document.getElementById("password");
          let password = passwordInput.value;
          
          // Hash password before sending
          let hashedPassword = await sha256(password); // Change to md5(password) if needed
          console.log("Hashed Password:", hashedPassword);
          
          // TODO: Send `hashedPassword` to the server instead of plain text password
      });
  }
});
document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("background-music");

    // Try autoplay
    audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction.");
    });

    // Ensure playback starts on user interaction
    document.body.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        }
    });
});
