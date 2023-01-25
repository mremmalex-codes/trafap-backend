import express, { Express } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import auth from "./modules/auth/auth.routes";
import traffic from "./modules/traffic/traffic.routes";
import swaggerJSDoc from "swagger-jsdoc";

const app: Express = express();

const PORT = process.env.PORT || 8080;

/**
 * @middleware declaration
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(cors());

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Trafap Api Documentation",
            version: "0.0.1",
        },
    },
    apis: [
        "./modules/auth/auth.routes.ts",
        "./modules/traffic/traffic.routes.ts",
    ],
};


app.use("/api/auth", auth);
app.use("/api/traffic", traffic);

const swaggerSpec = swaggerJSDoc(options);
app.use("/debug/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`application is runing on port ${PORT}`);
});
