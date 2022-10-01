const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio")
const { response } = require("express")
const fs = require('fs');

const fileName = 'index.html';
const file = fs.createWriteStream(fileName);



const PORT = 8000
const page = express()

const url = "https://www.learncpp.com"
const urls = []
html = "<!doctype html><html><head></head><body>"

file.once('open', function (fd) {

    axios(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            $(".lessontable-row-title")
                .each(function () {
                    urls.push($(this).find("a").attr("href"))
                })
            // console.log(urls)

            await mine(urls)
            html += "</body></html>"
            file.end(html);

        }).catch(err => console.log(err))

});

async function mine(urls) {
    for (const url of urls) {
        console.log(url)
        await axios(url)
            .then(response => {
                const $ = cheerio.load(response.data)
                $(".article-inner")
                    .each(function () {
                        html += $(this).html()
                    })
            }).catch(err => console.log(err))
        html += "<div style=\"break-after:page\"></div>"
    }
}


page.listen(PORT, () => console.log("running on port:", PORT))