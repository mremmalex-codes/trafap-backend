import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.SECRET_KEY!;

type TokenData = {
    username: string;
    userid: string;
};

const generate_access_token = (data: TokenData): string => {
    const token = jwt.sign(data, secret_key);
    return token;
};

const decode_access_token = (token: string) => {
    try {
        const decode = jwt.decode(token);
        return {
            data: decode,
            error: false,
        };
    } catch (error) {
        return {
            data: null,
            error: true,
        };
    }
};

export { decode_access_token, generate_access_token, TokenData };
