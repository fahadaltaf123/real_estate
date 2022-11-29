import JobCandidate from "../models/JobCandidate.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js"
import mailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

class CandidateStatus {
    static updateCandidateStatus = async (body, res, next) => {
        if (body.hasOwnProperty('candId') && body.hasOwnProperty('status') && body.hasOwnProperty('interviewDate') && body.hasOwnProperty('interviewTime') && body.hasOwnProperty('interviewDesc')) {
            const { candId, status, interviewDate, interviewTime, interviewDesc } = body
            // console.log(true)
            try {
                const candObj = await JobCandidate.update({ status:status, interviewDate: interviewDate, interviewTime: interviewTime, interviewDesc: interviewDesc }, { where: { id: candId } })
                const candObject = await JobCandidate.findOne({ where: { id: candId} })
                console.log(candObject);
                if (candObj.length != 0) {
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
                        to: candObject.email,
                        subject: 'Sheranwala Developers',
                        html: '<div><h4>Dear Mr. ' + candObject.firstName + ' ' + candObject.lastName + '</h4><p><span style="padding-left:100px; ">This</span> is to inform you that your profile has been shortlisted for the position of <b>Web Developer</b> at <b>Sheranwala Developers</b>. You are required to come for an interview on <b>'+ candObject.interviewDate +'</b> at <b>'+ candObject.interviewTime +'</b> sharp along with your updated resume. Kindly ask for the <b>HR Department</b> when you get here.</p></div>'
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