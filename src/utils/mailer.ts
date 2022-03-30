import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";

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


const sendMail = (mailDetails:TypeMailDetails) => {
    const {to,subject,html} = mailDetails;
    transporter.sendMail({
        from:'Hotel Manager',
        to,
        subject,
        html
    },(err,data) => {
        if(err){
            console.log('An error occurred', err);
        }else{
            console.log('Mail sent', data)
        }
        return err;
    })
}

export { sendMail }