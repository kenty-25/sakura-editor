(function() {
    if (Editor.GetFilename() != "") { return; }

    var wsh_shell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");

    var DEFAULT = {
        savedir: wsh_shell.ExpandEnvironmentStrings("%USERPROFILE%") + "\\OneDrive\\Desktop\\memo",
        filename_template: "{{YYYY}}{{MM}}{{DD}}_{{number}}.txt",
        charset: "UTF-8",
        linebreak: "CRLF"
    };

    var savedir = DEFAULT.savedir;
    var filename_template = DEFAULT.filename_template;
    var charset = DEFAULT.charset;
    var linebreak = DEFAULT.linebreak;

    if (!fso.FolderExists(savedir)) {
        fso.CreateFolder(savedir);
    }

    // 番号付きファイル名を重複しないように決定
    var now = getNowForTemplate();
    var number = 1;
    var path;
    while (true) {
        var filename = createFromTemplate(filename_template, now, { number: number });
        path = savedir + "\\" + filename;
        if (!fso.FileExists(path)) {
            break;
        }
        number++;
    }

    // ファイル保存
    Editor.FileSaveAs(path, charset, linebreak);

    // ---- 関数群 ----
    function createFromTemplate(tstr /*, ...args*/) {
        var obj = mergeObjects(Array.prototype.slice.call(arguments, 1));
        return tstr.replace(/\{\{(.*?)\}\}/g, function(_, name) {
            return obj[name] || "";
        });
    }
    function mergeObjects(objects) {
        var result = {};
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    result[k] = obj[k];
                }
            }
        }
        return result;
    }
    function getNowForTemplate() {
        var d = new Date();
        return {
            YYYY: padLeft(d.getFullYear(), 4),
            MM: padLeft(d.getMonth() + 1, 2),
            DD: padLeft(d.getDate(), 2)
        };
    }
    function padLeft(value, len, char) {
        char = char || "0";
        var padding = Array(len + 1).join(char);
        return (padding + value).slice(-len);
    }
})();
