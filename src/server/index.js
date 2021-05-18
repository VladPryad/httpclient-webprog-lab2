import express from 'express';

const port = 3000;

export default async () => {
    const app = express();

    app.use(express.static(process.cwd() + "/src/server/public"));

    app.listen( process.env.PORT || port, () => {
        console.log(`====== Server is running at port ${port} ======`)
    })
}