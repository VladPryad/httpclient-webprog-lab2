import axios from 'axios';
import * as jsdom from "jsdom";
import url from 'url';
import express from 'express';

const port = 4000;

export default async () => {
    const app = express();

    app.use("/", (req, res) => {
        client(req.query.uri)
        .then(value => {
            res.send(value);
        });
    });

    app.listen( process.env.PORT || port, () => {
        console.log(`====== API is running at port ${port} ======`)
    })
}

export const client = async (uri) => {
    console.log('====== Client is running ======')

    const response = await axios.get(uri);

    const dom = new jsdom.JSDOM(response.data);

    const href = dom.window.document.querySelector("a").getAttribute("href");
    const background = dom.window.document.querySelector("body").getAttribute("background");

    const processedUri = `http://${url.parse(uri).host}${background.slice(background.indexOf(".") + 1)}`;

    return {
        href,
        processedUri
    }
}