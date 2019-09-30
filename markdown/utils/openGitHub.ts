export default function (user: string = null, repo: string = null) {
  let path: string;

  path = `pages/account/developerInfo?username=${user}`;

  if (user === null) {
    path = '/';
  }

  if (repo !== null) {
    path = `pages/repo/repo?url=https://api.github.com/repos/${user}/${repo}`;
  }

  console.log(path);

  wx.navigateToMiniProgram({
    // appId: 'wx5d7793555064ce62',
    // path: 'pages/repo-detail/repo-detail?repo=yeasy/docker_practice',
    appId: 'wx2252b6835e7eb568',
    path,
    fail(e) {
       console.log(e);
    }
  });
}
