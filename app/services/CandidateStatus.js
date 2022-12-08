import JobCandidate from "../models/JobCandidate.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js"
import mailer from "nodemailer"
import dotenv from 'dotenv'
// import { WhatsAppAPI,Types} from "whatsapp-api-js";
import { createBot } from 'whatsapp-cloud-api';
// const { Text } = Types;
// var axios = require('axios');
import Axios from "axios";
import twilio from "twilio";
dotenv.config();

class CandidateStatus {
    static updateCandidateStatus = async (body, res, next) => {
        if (body.hasOwnProperty('candId') && body.hasOwnProperty('status') && body.hasOwnProperty('interviewDate') && body.hasOwnProperty('interviewTime') && body.hasOwnProperty('interviewDesc')) {
            const { candId, status, interviewDate, interviewTime, interviewDesc } = body
            // console.log(true)
            try {
                const candObj = await JobCandidate.update({ status:status, interviewDate: interviewDate, interviewTime: interviewTime, interviewDesc: interviewDesc }, { where: { id: candId } })
                const candObject = await JobCandidate.findOne({ where: { id: candId} })
                // console.log(candObject);
                if (candObj.length != 0) {

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
                    const accountSid = process.env.TWILIO_ACC_ID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const twilioPhone = process.env.TWILIO_PHONE;
                    const client = twilio(accountSid, authToken);

                    const accountWSid = process.env.TWILIO_W_ACC_ID;
                    const authWToken = process.env.TWILIO_W_AUTH_TOKEN;
                    const twilioWhatsappPhone = process.env.TWILIO_W_PHONE;
                    const wclient = twilio(accountWSid, authWToken);

                    console.log('twilioWhatsappPhone',twilioWhatsappPhone);
                    client.messages
                        .create({ body: interviewDesc, from: twilioPhone, to: candObject.phone })
                        .then(message => console.log(message.sid));

                    wclient.messages
                        .create({
                            body: interviewDesc,
                            from: twilioWhatsappPhone,
                            to: 'whatsapp:'+candObject.phone
                        })
                        .then(message => console.log(message.sid))
                .done();

                    // const token = process.env.WHATSAPP_API_TOKEN;
                    // const Whatsapp = new WhatsAppAPI(token);
                    
                    // Handlers.post(JSON.parse(e.data), onMessage);
                    
                    // const phoneID = 110479351898984;
                    // const phoneID = 101684492791476;
                    // const phone = '+923214648784'; 
                    // const name = 'Faizan';
                    // const body = 'body';

                    // const messageId = 1;

                    // const from = '110479351898984';
                    // const token = 'YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN';
                    // const to = '923214648784';
                    // const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';
                
                    // Create a bot that can send messages
                    // const bot = createBot(from, token);
                
                    // Send text message
                    // const result = await bot.sendText(to, 'Hello world');

                   
                    // var data = JSON.stringify({
                    //   "messaging_product": "whatsapp",
                    //   "to": "923214648784",
                    //   "type": "template",
                    //   "template": {
                    //     "name": "hello_world",
                    //     "language": {
                    //       "code": "en_US"
                    //     }
                    //   }
                    // });
                    
                    // var data = JSON.stringify({
                    //     "messaging_product": "whatsapp",
                    //     "to": "923214648784",
                    //     "type": "template",
                    //     "template": {
                    //       "name": "interview_scheduled",
                    //       "language": {
                    //         "code": "en_US"
                    //       }
                    //     }
                    //   });
                    
                    // var config = {
                    //   method: 'post',
                    //   url: 'https://graph.facebook.com/v15.0/110479351898984/messages',
                    //   headers: { 
                    //     'Authorization': 'Bearer EAARx5ere3bgBAK0tSpVnLPn6vHCiKqefzhgGlgnfIlcxnziRNf8NOHTZA47AAc8W4LreBxORq7tldenWNzLnb6YXh1yQTYSrgGgsV3JAMDbVXrZBpF2lbZCwc8KIaLuf1Hl8P5KXSosm5E5K82juMRgL7qZCYrE8ZApBuRZBTLYDGY1lSf9NgHspDBK7jmJvqv96XfQXeWCS4z8P1bPTx6CNKOnNlk2AQZD', 
                    //     'Content-Type': 'application/json'
                    //   },
                    //   data : data
                    // };
                    

                    const transporter = mailer.createTransport({
                        host: 'smtp.mailtrap.io',
                        port: 2525,
                        auth: {
                            user: process.env.EMAIL_USERNAME,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    });

                    const mailOptions = {
                        from: 'noreply@sheranwala.com',
                        to: candObject.email,
                        subject: 'Interview Scheduled',
                        html: interviewDesc
                        // html: '<div><h4>Dear Mr. ' + candObject.firstName + ' ' + candObject.lastName + '</h4><p><span style="padding-left:100px; ">This</span> is to inform you that your profile has been shortlisted for the position of <b>Web Developer</b> at <b>Sheranwala Developers</b>. You are required to come for an interview on <b>'+ candObject.interviewDate +'</b> at <b>'+ candObject.interviewTime +'</b> sharp along with your updated resume. Kindly ask for the <b>HR Department</b> when you get here.</p></div>'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    res.status(200).send({
                        "status": "success",
                        "message": "mail sent successfully"
                    })
                } else {
                    return next(CustomErrorHandler.notFound())
                }
            } catch (error) {
                console.log(error);
                return next(error)
            }
        }else if(body.hasOwnProperty('candId') && body.hasOwnProperty('status') && body.hasOwnProperty('remarks')){
            const { candId, status, remarks } = body
            try {
                const candWithRemarks = await JobCandidate.update({ status: status, remarks:remarks }, { where: { id: candId } })
                console.log(candWithRemarks[0])
                if (candWithRemarks[0] === 0) {

                    return next(CustomErrorHandler.notFound())
                } else {
                    res.status(200).send({
                        "status": "success",
                        "message": "update candidate status successfully"
                    })
                }
            } catch (error) {
                return next(error)
            }
        } else if(body.hasOwnProperty('candId') && body.hasOwnProperty('status') && body.hasOwnProperty('dateOfJoining')){
            const { candId, status, dateOfJoining } = body
            try {
                const candUpdateDateOfJoining = await JobCandidate.update({ status: status, dateOfJoining:dateOfJoining }, { where: { id: candId } })
                console.log(candUpdateDateOfJoining[0]);
                const candDateOfJoining = await JobCandidate.findOne({ where: { id: candId} })
                if((candUpdateDateOfJoining[0] === 1) && (candDateOfJoining.status === "Send Offer Letter")){
                    const transporter = mailer.createTransport({
                        host: 'smtp.mailtrap.io',
                        port: 2525,
                        auth: {
                            user: process.env.EMAIL_USERNAME,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    });
                    const mailOptions = {
                        from: 'muhammadhassanjutt786@gmail.com',
                        to: candDateOfJoining.email,
                        subject: 'Sheranwala Developers',
                        html: '<div><h4>Dear Mr. ' + candDateOfJoining.firstName + ' ' + candDateOfJoining.lastName + '</h4><p><span style="padding-left:100px; ">We</span> are excited to offer you a full-time position as a <b>Graphic Designer</b> at <b>Sheranwala Developers</b>. Based on your experience, interviews and design portfolio, we look forward to seeing how you will take our brand messaging to the next level.<br><br><span style="padding-left:100px; ">If</span> you decide to accept this role, your anticipated start date will be <b>'+ candDateOfJoining.dateOfJoining +'</b> at our 1234 Southern Avenue location. You will be expected to work 40 hours per week, Monday through Friday with the option to work remotely up to two days per week. Please find attached an updated copy of the job description to familiarize yourself with some of the position’s duties and responsibilities.<br><br>Sincerly,<br>HR Manager</p></div>'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.status(200).send({
                        "status": "success",
                        "message": "mail sent successfully"
                    })
                }
            } catch (error) {
                return next(error)
            }
        }else if (body.hasOwnProperty('candId') && body.hasOwnProperty('status')) {
            const { candId, status } = body
            console.log(body);
            try {
                const cand = await JobCandidate.update({ status: status }, { where: { id: candId } })
                console.log(cand[0])
                if (cand[0] === 0) {

                    return next(CustomErrorHandler.notFound())
                } else {
                    res.status(200).send({
                        "status": "success",
                        "message": "update candidate status successfully"
                    })
                }
            } catch (error) {
                return next(error)
            }
        }else{
            return next(CustomErrorHandler.wrongCredentials("all fields are required"))
        }
    }
}

export default CandidateStatus