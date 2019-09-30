"use strict";
exports.__esModule = true;
function default_1(user, repo) {
    if (user === void 0) { user = null; }
    if (repo === void 0) { repo = null; }
    var path;
    path = "pages/account/developerInfo?username=" + user;
    if (user === null) {
        path = '/';
    }
    if (repo !== null) {
        path = "pages/repo/repo?url=https://api.github.com/repos/" + user + "/" + repo;
    }
    console.log(path);
    wx.navigateToMiniProgram({
        // appId: 'wx5d7793555064ce62',
        // path: 'pages/repo-detail/repo-detail?repo=yeasy/docker_practice',
        appId: 'wx2252b6835e7eb568',
        path: path,
        fail: function (e) {
            console.log(e);
        }
    });
}
exports["default"] = default_1;
