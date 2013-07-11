var PSON = require("../PSON.min.js"),
    assert = require("assert");

var pson = new PSON();
var data = {
    "hello": "world!",
    "time": 1234567890,
    "float": 0.011,
    "boolean": true,
    "otherbool": false,
    "null": null,
    "obj": {
        "what": "that"
    },
    "arr": [1,2,3]
};
var bb = pson.encode(data).compact();
pson.decode(bb); // fill dict
var nDict = bb.length;
bb = pson.encode(data).compact();
var nAgain = bb.length;
var decData = pson.decode(bb);
assert.deepEqual(data, decData);

console.log("OK: JSON="+JSON.stringify(data).length+", PSON="+nDict+" dict, "+nAgain+" again");

/**
 12 id=2 (data), wt=2
 18 len=24
 1A id=3 (object), wt=2
 16 len=22
 0A id=1 (refs), wt=2
 02 len=2 packed
 00 > =0
 01 > =1
 12 id=2 (values), wt=2
 10 len=16 packed
 00 len=0 > =null ???
 0E len=14
 1A id=3 (object), wt=2
 0C len=12
 0A id=1 (refs), wt=2
 01 len=1
 02 > =2
 12 id=2 (values), wt=2
 07 len=7
 06 len=6
 2A id=5 (string), wt=2
 04 len=4
 64 ...
 61 ...
 74 ...
 61 > =data
 */