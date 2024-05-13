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
  };
  (function (e, n, o, t) {
    new (o || (o = Promise))((function (s, c) {
      function i(e) {
        try {
          r(t.next(e))
        } catch (e) {
          c(e)
        }
      }

      function a(e) {
        try {
          r(t.throw(e))
        } catch (e) {
          c(e)
        }
      }

      function r(e) {
        var n;
        e.done ? s(e.value) : (n = e.value, n instanceof o ? n : new o((function (e) {
          e(n)
        }))).then(i, a)
      }

      r((t = t.apply(e, n || [])).next())
    }))
  })(void 0, void 0, void 0, (function* () {
    const o = yield new Promise((e => chrome.storage.sync.get(n, (n => e(n))))),
      t = document.getElementById("localPathForRepositories"), s = document.getElementById("defaultIde");
    t.value = o.localPathForRepositories, s.value = o.defaultIde, t.addEventListener("input", (e => {
      let n = e.target.value;
      n.endsWith("/") && (n = n.slice(0, -1)), chrome.storage.sync.set({localPathForRepositories: n})
    })), s.addEventListener("change", (n => {
      const o = n.target.value;
      chrome.storage.sync.set({defaultIde: o}), (n => {
        chrome[3 === chrome.runtime.getManifest().manifest_version ? "action" : "browserAction"].setIcon({
          path: {
            16: e[n].getIcon(16),
            32: e[n].getIcon(32),
            48: e[n].getIcon(48),
            64: e[n].getIcon(64),
            128: e[n].getIcon(128)
          }
        })
      })(o)
    })), ["showIconInFileTree", "showIconOnFileBlockHeaders", "showIconOnLineNumbers", "showDebugMessages"].forEach((e => {
      const n = document.getElementById(e);
      n.checked = o[e], n.addEventListener("change", (e => {
        const n = e.target;
        chrome.storage.sync.set({[n.id]: n.checked})
      }))
    })), document.getElementById("version").innerText = chrome.runtime.getManifest().version
  }))
})();
//# sourceMappingURL=popup.js.map