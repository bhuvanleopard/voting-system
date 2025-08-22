import nodemailer, {type Transporter, type SendMailOptions} from 'nodemailer';
import express, {type Request, type Response} from 'express';
import _dotenv from "dotenv";


const createTransporter = function(host: string, port: number, secure: boolean, service: string, user: string, pass: string ):Transporter{

    return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    service: service,
    auth: {

        user: user,
        pass: pass
    }
    });


};



const send = async function(transporter: Transporter, client: string, subject: string, htmlContent: string, senders_mail?: string):Promise<void>{

    await transporter.sendMail({

        from: senders_mail || `${process.env.NODE_MAILER_USER}`,
        to: client, 
        subject: subject , 
        html: htmlContent

    });
}

const defaultTransporter: Transporter = createTransporter(`${process.env.NODE_MAILER_HOST}`, 465, true, "gmail", `${process.env.NODE_MAILER_USER}`, `${process.env.NODE_MAILER_PASS}`)
const mailer = {createTransporter, send, defaultTransporter};
export default mailer;