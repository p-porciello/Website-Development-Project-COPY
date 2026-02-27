import { Inquiry } from "./types";

export function CreateInquiry(name: string, date: string, body: string): Inquiry {
    const inquiry: Inquiry = {
        inquirerName: name,
        dateSent: date,
        content: body
    }

    return inquiry
}