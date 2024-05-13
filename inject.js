(() => {
  "use strict";
  const e = {
    vscode: {name: "VS Code", getIcon: e => `icons/vscode${e}.png`},
    "vscode-wsl": {name: "VS Code [WSL]", getIcon: e => `icons/vscode${e}.png`},
    vscodium: {name: "VSCodium", getIcon: e => `icons/vscodium${e}.png`},
    "vscodium-wsl": {name: "VSCodium [WSL]", getIcon: e => `icons/vscodium${e}.png`},
    "vscode-insiders": {name: "VS Code Insiders", getIcon: e => `icons/vscode-insiders${e}.png`},
    "vscode-insiders-wsl": {name: "VS Code Insiders [WSL]", getIcon: e => `icons/vscode-insiders${e}.png`},
    phpstorm: {name: "PhpStorm", getIcon: e => `icons/phpstorm${e}.png`},
    "intellij-idea": {name: "IntelliJ IDEA", getIcon: e => `icons/intellij-idea${e}.png`},
    webstorm: {name: "WebStorm", getIcon: e => `icons/webstorm${e}.png`},
    goland: {name: "GoLand", getIcon: e => `icons/goland${e}.png`},
    "jetbrains-webserver": {name: "JetBrains", getIcon: e => `icons/jetbrains${e}.png`}
  }, n = {
    localPathForRepositories: "/home/changeMe",
    defaultIde: "vscode",
    showIconInFileTree: !0,
    showIconOnFileBlockHeaders: !0,
    showIconOnLineNumbers: !0,
    showDebugMessages: !1
  }, o = (e, n = 250) => {
    let o;
    return function (...t) {
      clearTimeout(o), o = window.setTimeout((() => e.apply(this, t)), n)
    }
  };
  (function (e, n, o, t) {
    new (o || (o = Promise))((function (i, l) {
      function s(e) {
        try {
          c(t.next(e))
        } catch (e) {
          l(e)
        }
      }

      function r(e) {
        try {
          c(t.throw(e))
        } catch (e) {
          l(e)
        }
      }

      function c(e) {
        var n;
        e.done ? i(e.value) : (n = e.value, n instanceof o ? n : new o((function (e) {
          e(n)
        }))).then(s, r)
      }

      c((t = t.apply(e, n || [])).next())
    }))
  })(void 0, void 0, void 0, (function* () {
    const t = yield new Promise((e => chrome.storage.sync.get(n, (n => e(n)))));

    function i(...e) {
      t.showDebugMessages && console.log.apply(null, ["[OPEN-IN-IDE EXTENSION]", ...e])
    }

    const l = {
      vscode: (e, n, o) => {
        const i = `vscode://file/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}`;
        return location.href = i, i
      }, "vscode-wsl": (e, n, o) => {
        const i = `vscode://vscode-remote/wsl+Ubuntu/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}:1`;
        return location.href = i, i
      }, vscodium: (e, n, o) => {
        const i = `vscodium://file/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}`;
        return location.href = i, i
      }, "vscodium-wsl": (e, n, o) => {
        const i = `vscodium://vscode-remote/wsl+Ubuntu/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}:1`;
        return location.href = i, i
      }, "vscode-insiders": (e, n, o) => {
        const i = `vscode-insiders://file/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}`;
        return location.href = i, i
      }, "vscode-insiders-wsl": (e, n, o) => {
        const i = `vscode-insiders://vscode-remote/wsl+Ubuntu/${t.localPathForRepositories}/${e}/${n}:${null != o ? o : "1"}:1`;
        return location.href = i, i
      }, phpstorm: (e, n, o) => {
        const i = `phpstorm://open?file=${t.localPathForRepositories}/${e}/${n}&line=${null != o ? o : "1"}`;
        return location.href = i, i
      }, "intellij-idea": (e, n, o) => {
        const i = `rubymine://open?file=${t.localPathForRepositories}/${e}/${n}&line=${null != o ? o : "1"}`;
        return location.href = i, i
      }, webstorm: (e, n, o) => {
        const i = `webstorm://open?file=${t.localPathForRepositories}/${e}/${n}&line=${null != o ? o : "1"}`;
        return location.href = i, i
      }, goland: (e, n, o) => {
        const i = `goland://open?file=${t.localPathForRepositories}/${e}/${n}&line=${null != o ? o : "1"}`;
        return location.href = i, i
      }, "jetbrains-webserver": (e, n, o) => {
        const i = `http://localhost:63342/api/file?file=${t.localPathForRepositories}/${e}/${n}&line=${null != o ? o : "1"}`;
        return fetch(i).catch((() => alert("Unable to open the file.\nIs the built-in web server started on localhost:63342 ?"))), i
      }
    }, s = (n, o, s) => {
      const r = document.createElement("a");
      let c = `Open ${o.split("/").pop()} in ${e[t.defaultIde].name}`;
      s && (c = `${c} at line ${s}`), r.title = c, r.classList.add("open-in-ide-icon");
      const d = document.createElement("img");
      return d.src = chrome.runtime.getURL(e[t.defaultIde].getIcon(32)), r.appendChild(d), r.addEventListener("click", (e => {
        e.preventDefault(), i(`Opened ${l[t.defaultIde](n, o, null != s ? s : void 0)}`)
      })), r
    }, r = /.+\/([^/]+)\/(blob|tree)\/[^/]+\/(.*)/, c = () => {
      i("Adding editor icons");
      let e = 0;
      if (t.showIconInFileTree && document.querySelectorAll('[aria-labelledby="files"].js-navigation-container > .Box-row.js-navigation-item .css-truncate').forEach((n => {
        var o, t, i;
        if (null === (o = n.parentNode) || void 0 === o ? void 0 : o.querySelector(".open-in-ide-icon")) return;
        const l = null === (t = n.querySelector("a")) || void 0 === t ? void 0 : t.getAttribute("href");
        if (!l || !r.test(l)) return;
        const c = r.exec(l), d = null == c ? void 0 : c[1], a = null == c ? void 0 : c[3];
        if (!d || !a) return;
        const u = s(d, a);
        u.classList.add("open-in-ide-icon-file-explorer"), null === (i = n.parentNode) || void 0 === i || i.insertBefore(u, n.nextSibling), e++
      })), t.showIconOnFileBlockHeaders || t.showIconOnLineNumbers) {
        let n = !0, o = document.querySelectorAll(".file a.Link--primary[title]");
        o.length || (o = document.querySelectorAll(".js-comment-container a.Link--primary[title]"), n = !1);
        const i = window.location.href.split("/")[4];
        o.forEach((o => {
          var l, r, c, d;
          const a = null === (r = null === (l = o.getAttribute("title")) || void 0 === l ? void 0 : l.split("→").pop()) || void 0 === r ? void 0 : r.trim();
          if (!a) return;
          let u;
          const p = o.closest(n ? ".file" : ".js-comment-container");
          if (p) if (n) {
            const e = p.querySelector("td.blob-num-deletion[data-line-number], td.blob-num-addition[data-line-number]");
            u = null == e ? void 0 : e.getAttribute("data-line-number")
          } else {
            const e = p.querySelectorAll("td[data-line-number]");
            if (0 === e.length) return;
            u = e[e.length - 1].getAttribute("data-line-number")
          }
          if (t.showIconOnFileBlockHeaders && !(null === (c = o.parentNode) || void 0 === c ? void 0 : c.querySelector(".open-in-ide-icon"))) {
            const n = s(i, a, u);
            null === (d = o.parentNode) || void 0 === d || d.insertBefore(n, null), e++
          }
          t.showIconOnLineNumbers && p && p.querySelectorAll("td.blob-num[data-line-number]").forEach((n => {
            if (n.querySelector(".open-in-ide-icon")) return;
            const o = n.getAttribute("data-line-number"), t = s(i, a, o);
            n.classList.add("js-open-in-ide-icon-added"), n.appendChild(t), e++
          }))
        }))
      }
      i(`Added ${e} new editor icons`)
    }, d = () => {
      i("Observing page changes");
      const e = document.querySelector(".repository-content");
      e && u.observe(e, {childList: !0, subtree: !0})
    }, a = document.createElement("style");
    t.showIconOnLineNumbers && (a.innerHTML += "tr:hover > td.js-open-in-ide-icon-added::before {\n      display: none;\n    }"), document.head.appendChild(a);
    const u = new MutationObserver((function (e) {
      e.forEach(o((function (e) {
        e.target.querySelector(":scope > .open-in-ide-icon") || (i("Detected page changes:"), i(e.target), c(), d())
      })))
    }));
    c(), d(), u.observe(document.head, {childList: !0})
  }))
})();
//# sourceMappingURL=inject.js.map