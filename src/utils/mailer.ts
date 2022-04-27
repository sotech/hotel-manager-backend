import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
import { UserType } from "../types/types";

dotenv.config();

type TypeMailDetails = {
    to: string,
    subject: string,
    html: string
}

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    }
})

const notificarUsuarioCreadoUsuario = (user: UserType) => {
    sendMail({
        to: user.email,
        subject: 'Usuario creado',
        html: `Usuario creado. Datos:
              <ul>
              <li>Nombre completo:${user.fullname}</li>
              <li>Email:${user.email}</li>
              </ul>
        `
    })
}

const notificarUsuarioCreadoAdmin = (user: UserType) => {
    sendMail({
        to: process.env.USER_MAIL || 'hotel.notifier@gmail.com',
        subject: 'Usuario creado',
        html: `Usuario creado. Datos:
              <ul>
              <li>Nombre completo:${user.fullname}</li>
              <li>Email:${user.email}</li>
              </ul>
        `
      })
}

const sendMail = (mailDetails: TypeMailDetails) => {
    const { to, subject, html } = mailDetails;
    transporter.sendMail({
        from: 'Hotel Manager',
        to,
        subject,
        html
    }, (err, data) => {
        if (err) {
            console.log('An error occurred', err);
        } else {
            console.log('Mail sent', data)
        }
        return err;
    })
}

export { sendMail, notificarUsuarioCreadoAdmin, notificarUsuarioCreadoUsuario }