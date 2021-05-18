import axios from 'axios';
import * as jsdom from "jsdom";
import url from 'url';

export default async () => {
    console.log('====== Client is running ======')

    const uri = "http://localhost:3000/mainpage.html";
    const response = await axios.get(uri);

    const dom = new jsdom.JSDOM(response.data);

    const href = dom.window.document.querySelector("a").getAttribute("href");
    const background = dom.window.document.querySelector("body").getAttribute("background");

    const processedUri = `http://${url.parse(uri).host}${background.slice(background.indexOf(".") + 1)}`;

    console.log("=====================");

    console.log(`Links from page: ${href}`);

    console.log(`Background image: ${processedUri}`);

    console.log("=====================");
}