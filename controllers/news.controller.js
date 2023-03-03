const { getNewsFromUrl } = require("../services/news.service");

exports.getPressRelease = (req, res, next) => {
    const url = "https://www.imigrasi.go.id/id/category/siaran-pers";

    getNewsFromUrl(url, (error, news) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(news);
    });
};

exports.getNews = (req, res, next) => {
    const url = "https://www.imigrasi.go.id/id/category/berita";

    getNewsFromUrl(url, (error, news) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(news);
    });
};
