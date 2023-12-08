import emailjs from "emailjs-com";

export function sendEmail(username, email, subject, message) {
    const bodyMessage = `   
        User: ${username}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
`;

    return emailjs.send("service_n93cqyp", "template_6m1zvsj", {
        to_email: "niki9999n@gmail.com",
        from_name: username,
        from_email: email,
        subject,
        message: bodyMessage,
    });
}
