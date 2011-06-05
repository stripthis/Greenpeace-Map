#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var inputPath = path.join(__dirname, '../data/sumatra/callouts.tsv');
var outputPath = path.join(__dirname, '../data/sumatra/map.json');

var outputJson = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

var map = {
  id: 6,
  title: 3,
  caption: 4,
  image_url: 8,
  credit: 5,
  location: 1,
  date: 2,
};

var remainingCallbacks = 0;

var data = fs.readFileSync(inputPath, 'utf8');
data.split('\n').forEach(function(line) {
  var parts = line.split('\t');
  var item = {};

  for (var property in map) {
    item[property] = parts[map[property]];
  }

  var id = item.id;
  delete item.id;
  if (!id) {
    return;
  }

  remainingCallbacks++;

  var cmd = 'curl "' + item.image_url + '" | exiftool -j -';
  exec(cmd, function(err, stdout, stderr) {
    remainingCallbacks--;

    var json = JSON.parse(stdout);
    item.image_width = json[0].ImageWidth;
    item.image_height = json[0].ImageHeight;

    if (remainingCallbacks === 0) {
      writeMapJson();
    }
  });

  outputJson.items[id] = item;
});

function writeMapJson() {
  var output = JSON.stringify(outputJson, null, 2);
  fs.writeFileSync(outputPath, output, 'utf8');
}
