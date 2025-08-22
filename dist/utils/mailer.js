import nodemailer, {} from 'nodemailer';
import express, {} from 'express';
import _dotenv from "dotenv";
const createTransporter = function (host, port, secure, service, user, pass) {
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
const send = async function (transporter, client, subject, htmlContent, senders_mail) {
    await transporter.sendMail({
        from: senders_mail || `${process.env.NODE_MAILER_USER}`,
        to: client,
        subject: subject,
        html: htmlContent
    });
};
const defaultTransporter = createTransporter(`${process.env.NODE_MAILER_HOST}`, 465, true, "gmail", `${process.env.NODE_MAILER_USER}`, `${process.env.NODE_MAILER_PASS}`);
const mailer = { createTransporter, send, defaultTransporter };
export default mailer;
