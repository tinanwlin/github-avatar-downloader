var request = require('request');
var token = require('./secrets');
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN,
    }
  };

  request(options, function (err, res, body) {
    var contributors = JSON.parse(body);

      cb(err, contributors);
    });
}

getRepoContributors(owner, repo, function (err, result) {
  if (err) {
    console.log("Errors:", err);
  }
  
  result.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, "avatars/" + contributor.id + ".jpg");
});
});
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
  ('end', console.log('Downloading image'))                          
  console.log('Response Status Code: ', response.statusCode,
  'Response Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
  ('finish', console.log('Download Complete!'))
  })
  .pipe(fs.createWriteStream(filePath));
}