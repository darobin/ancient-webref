#!/usr/local/bin/node
/*jshint evil: true*/

var fs = require("fs")
,   _ = require("underscore")
;

function get (path) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

var berjon = {};
eval(fs.readFileSync("/Projects/respec/bibref/biblio.js", "utf-8"));
var respecBib = berjon.biblio
,   specDataBib = get("/Projects/respec/scratch/specification-data/references.json")
,   specDataRFC = get("/Projects/respec/scratch/specification-data/RFCs.json")
,   xrefBase = get("/Projects/respec/scratch/specification-data/specs.json")
;

// convert respecBib to new format, then merge
var newRespecBib = {};
for (var k in respecBib) newRespecBib[k] = { html: respecBib[k] };
_.extend(newRespecBib, specDataBib, specDataRFC);
// XXX we should sort here
fs.writeFileSync("/Projects/webref/bibrefs.json", JSON.stringify(newRespecBib, null, 4));

// process xrefBase by import
var newXref = {};
for (var k in xrefBase) {
    newXref[k] = JSON.parse(fs.readFileSync("/Projects/respec/scratch/specification-data/xrefs/" + xrefBase[k]));
}
fs.writeFileSync("/Projects/webref/xrefs.json", JSON.stringify(newXref, null, 4));
