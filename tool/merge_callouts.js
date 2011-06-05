#!/usr/bin/env node
var path = require('path');
var fs = require('fs');

var inputPath = path.join(__dirname, '../data/sumatra/callouts.tsv');
var outputPath = path.join(__dirname, '../data/sumatra/map.json');

var outputJson = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

var map = {
  id: 6,
  caption: 4,
  image_url: 8,
  credit: 5,
  location: 1,
  date: 2,
};

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

  outputJson.items[id] = item;
});

var output = JSON.stringify(outputJson, null, 2);
fs.writeFileSync(outputPath, output, 'utf8');
