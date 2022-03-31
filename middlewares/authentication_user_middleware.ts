import { Request, Response, NextFunction } from 'express'
import axios, { AxiosRequestHeaders } from 'axios'
import { USERS_SERVICE } from '../available_services'

export default async (req: Request, res: Response, next: NextFunction) => {

    const isAuthResponse = await axios.get(USERS_SERVICE + "/users/is-authenticated", {
        headers: req.headers as AxiosRequestHeaders
    });

    if (isAuthResponse.data.ok) {
        return next();
    }

    return res.send('_whithout_permission_');

} 