var transform = require('gulp-text-simple'); 

// parse sortcode file function
var parseScsubtab = function (s) {
    console.log("parsing SCSUBTAB");
    // create result function start
    var result = "function replaceSort(sc) {\n";
    // split file into lines
    var lines = s.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l) {
            result += " if(sc == " + l.substr(0, 6) + ") return " + l.substr(7, 6) + ";\n";
        }
    }
    result += " return sc; // use plan sort\n}\n";
    return result;
};

// parse validation entries function
var parseValacdos = function (s) {
    console.log("parsing VALACDOS");
    // create result function
    var result = "// get validation entries\nfunction getEntries(sc) {\n var r =[];\n";
    // split file into lines
    var lines = s.split('\n');
    // create function
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l) {
            var sc1 = parseInt(l.substr(0, 6));
            var sc2 = parseInt(l.substr(7, 6));
            var method = l.substr(14, 5).trim();
            // build array
            var a = "[", b = "";
            for (var j = 0; j < 14; j++) {
                var c = l.substr(j * 5 + 19, 5).trim();
                a += b + c;
                b = ",";
            }
            a += "]";
            var e = parseInt(l.substr(90, 3));
            if (isNaN(e)) e = 0;
            result += " if(sc >= " + sc1 + " && sc <= " + sc2 + ")\n" +
                "  r.push({m: \"" + method + "\", w: " + a + ", e: " + e + "});\n";
            // m: method, w: weights, e: exception
        }
    }
    result += " return r;\n}\n";
    return result;
};

exports.transformScsubtab = transform(parseScsubtab);
exports.transformValacdos = transform(parseValacdos);