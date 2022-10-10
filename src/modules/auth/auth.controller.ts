import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import argon2 from "argon2";
import { Register } from "./auth.types";
import prisma from "../../utils/prisma";
import email_validator from "../../utils/validators/email";

/** this class groups all the http handler and other auth functions */
export class AuthController {
    /**
     *  this handleer handles the registraion request
     *  taking the @username , @email , and @password as parameters
     * */
    static async registerHandler(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { username, password, email }: Register = req.body;
        if (username.length < 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Username Field Is Required",
                statusCode: StatusCodes.BAD_REQUEST,
                error: true,
                data: null,
            });
        }
        if (!email_validator(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email field is invalid",
                statusCode: StatusCodes.BAD_REQUEST,
                error: true,
                data: null,
            });
        }

        if (password.length == 0 || password.length < 6) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Password field must be greeter than 6 characters",
                statusCode: StatusCodes.BAD_REQUEST,
                error: true,
                data: null,
            });
        }

        try {
            const is_user_exits = await prisma.user.findUnique({
                where: {
                    username: username,
                },
            });
            if (is_user_exits) {
                return res.status(StatusCodes.CONFLICT).json({
                    message: "user with this username exits",
                    statusCode: StatusCodes.CONFLICT,
                    error: true,
                    data: null,
                });
            }
            const hashed_password = await argon2.hash(password);

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashed_password,
                },
            });
            return res.status(200).json({
                message: "registration successful",
                statusCode: StatusCodes.OK,
                error: false,
                data: {
                    created_At: user.create_at,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                message: "hello",
            });
        }
    }

    static async loginHandler(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({
            message: "hello",
        });
    }
}
