import "module-alias/register";

import { env } from "config/env";

import express, { Application } from "express";
import compression from "compression";
import morgan from "morgan";
import { setChartRoutes } from "routes/charts";

const app: Application = express();
const PORT = env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

app.use(compression());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setChartRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
    console.log(`Access web page on http://localhost:${PORT}/charts`);
});

export default app;
