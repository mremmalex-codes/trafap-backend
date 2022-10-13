import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../utils/prisma";
import { TrafficInfo } from "./traffic.types";

/**
 * this conteoller groups all the enpoint handler for the traffic
 * endpoint:w
 *
 * */
export class TrafficController {
    /**
     * this handles the creatiion of a traffic update
     * it takes account of @location @city @description and @status of the traffic
     * description is what casued the traffic at that time ::w
     *
     * */
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

    /**
     * this handles the endpoin for search for a traffic update based on
     *  users current location using a query parameter
     * */
    static async searchTrafficHanlder(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const query = req.query.s;
            const result = await prisma.traffic.findMany({
                where: {
                    location: {
                        contains: query as string,
                    },
                },
            });
            if (result.length == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Traffic Update Not Found",
                    statusCode: StatusCodes.NOT_FOUND,
                    error: false,
                    data: result,
                });
            }
            return res.status(StatusCodes.OK).json({
                message: "Traffic update found",
                statusCode: StatusCodes.OK,
                error: false,
                data: result,
            });
        } catch (error) {
            return res.status(StatusCodes.OK).json({
                message: "Internal Server Error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: true,
            });
        }
    }

    static async updateTrafficHandler(
        req: Request,
        res: Response
    ): Promise<Response> {
        return res;
    }

    static async allTrafficHandler(
        req: Request,
        res: Response
    ): Promise<Response> {
        return res;
    }
}
