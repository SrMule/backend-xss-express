import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import xss from 'xss';

const router = express.Router();

router.post('/form', [
    body('username').trim().custom((value) => {
        const sanitizedValue = xss(value);
        if (sanitizedValue !== value) {
            throw new Error('Caracteres no permitidos en el nombre de usuario');
        }
        return true;
    }),
    body('password').trim().custom((value) => {
        const sanitizedValue = xss(value);
        if (sanitizedValue !== value) {
            throw new Error('Caracteres no permitidos en la contraseña');
        }
        return true;
    }),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;

    res.send("Datos seguros");
    //res.json({ username, password });
});

export default router;