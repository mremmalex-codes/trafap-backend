import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import { TrafficInfo } from "./traffic.types";
export class trafficController {
    static async addTrafficHanlder(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const { location, state, status, description }: TrafficInfo =
                req.body;
            await prisma.traffic.create({
                data: {
                    description,
                    location,
                    state,
                    status,
                },
            });
            return res.status(StatusCodes.OK).json({
                message: "Traffic Update Created",
                statusCode: StatusCodes.OK,
                error: false,
            });
        } catch (error) {
            return res.status(StatusCodes.OK).json({
                message: "Error Occured While Creating The Update",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: true,
            });
        }
    }

    static async searchTrafficHanlder(
        req: Request,
        res: Response
    ): Promise<Response> {
        return res;
    }
}
