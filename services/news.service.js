const request = require("request");
const cheerio = require("cheerio");

exports.getNewsFromUrl = (url, callback) => {
    request(url, (error, response, html) => {
        if (error || response.statusCode !== 200) {
            return callback(error || new Error("Failed to fetch news"));
        }

        const $ = cheerio.load(html);
        const news = [];

        $(".site-main").find("article").each((i, el) => {
            const title = $(el).find("h2").text();
            const link = $(el).find("a").attr("href");
            const image = $(el).find("img").attr("src");
            const author = $(el).find("span").text().split(" ")[8];
            const date = ($(el).find('.themestek-date')[0].children[0].data).trim().replace(/\s\s+/g, ' ');
            const excerpt = $(el).find("p").text();

            news.push({ title, link, author, image, date, excerpt });
        });

        callback(null, news);
    });
};
