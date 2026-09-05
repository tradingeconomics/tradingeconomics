import { Application, Router } from "express";
import ChartController from "controllers/chart-controller";

const router = Router();

export const setChartRoutes = (app: Application): void => {
    const chartController = new ChartController();

    router.get("/charts", chartController.renderChartPage);

    app.use("/", router);
};
