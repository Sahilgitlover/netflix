//  this file is made for purpose of using resend

import {Resend} from "resend"
export const resend = new Resend(process.env.RESEND_API_KEY)