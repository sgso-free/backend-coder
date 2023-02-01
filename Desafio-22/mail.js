const nodemailer = require("nodemailer");
const logger = require('./logger.js'); 

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chasity.hauck@ethereal.email',
        pass: 'YgPCxMDERHTVkxEVWX'
    }
});

const opts = {
    from: 'Servidor Node',
    to: 'chasity.hauck@ethereal.email',
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

module.exports = sendMail
