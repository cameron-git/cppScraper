const cheerio = require("cheerio")
const fs = require("fs");

const $ = cheerio.load(fs.readFileSync("index_copy.html"))

$(".ezlazyload").each(function () {
    $(this).attr("src", $(this).attr("data-ezsrc"))
})

$(".cpp-section").each(function () {
    $(this).replaceWith("<br><h3>" + $(this).text() + "</h3>")
})
$(".cpp-note-title").each(function () {
    $(this).replaceWith("<h4>" + $(this).text() + "</h4>")
})

$("code").each(function () {
    const list = $(this).text().split("\n")
    for (const line of list) {
        $(this).before("<code>" + line + "</code>")
    }
    $(this).remove()
})

$(".prevnext").remove()
$(".entry-meta").remove()
$(".code-block").remove()


const file = fs.createWriteStream("index.html");

file.once("open", function (fd) {
    file.end($.html());
})