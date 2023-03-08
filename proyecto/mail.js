import nodemailer from "nodemailer" ;
import logger from './logger.js' ; 
import config from './config.js' 

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    }
});

const opts = {
    from: 'Servidor Node',
    to: process.env.MAIL_AUTH_USER,
    subject: ' Hola from Node',
    html: '<h1></h1>'
}

class sendMail {
    async senMail (subject,html) {
        try { 
            opts.subject=subject
            opts.html = html 
            let result = await transporter.sendMail(opts) 
            return result
        } catch (error) {
            logger.log('error', `Error in sned mail${error.message}`)
        }
    }

}

export default sendMail
