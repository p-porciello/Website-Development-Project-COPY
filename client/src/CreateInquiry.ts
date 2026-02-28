import { Inquiry } from "./types";

export function NewInquiry(name: string, date: Date, body: string): Inquiry {
    const inquiry: Inquiry = {
        inquirerName: name,
        dateSent: date,
        content: body
    }

    return inquiry
}