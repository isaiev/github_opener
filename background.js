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
  var o = function (e, n, o, s) {
    return new (o || (o = Promise))((function (c, t) {
      function i(e) {
        try {
          r(s.next(e))
        } catch (e) {
          t(e)
        }
      }

      function d(e) {
        try {
          r(s.throw(e))
        } catch (e) {
          t(e)
        }
      }

      function r(e) {
        var n;
        e.done ? c(e.value) : (n = e.value, n instanceof o ? n : new o((function (e) {
          e(n)
        }))).then(i, d)
      }

      r((s = s.apply(e, n || [])).next())
    }))
  };
  chrome.runtime.onInstalled.addListener((() => o(void 0, void 0, void 0, (function* () {
    const {defaultIde: o} = yield new Promise((e => chrome.storage.sync.get(n, (n => e(n)))));
    (n => {
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
  }))))
})();
//# sourceMappingURL=background.js.map