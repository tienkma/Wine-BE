const nodemailer = require("nodemailer");

const { OAuth2Client } = require("google-auth-library");

const GOOGLE_MAILER_CLIENT_ID =
  "104399304881-8ael520prh01l5oollu0h0v8f1up1nep.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04ghHrbdq4JXACgYIARAAGAQSNwF-L9Irj0bUx1Arttfq7uQFtHQrBSQGR7P6z78XBdxOPRHpDnJflqYFXbxjCVIn6adkIQBiweQ";
const ADMIN_EMAIL_ADDRESS = "huutung4700@gmail.com";

const sendEmail = async (req, res) => {
  try {
    const myOAuth2Client = new OAuth2Client(
      GOOGLE_MAILER_CLIENT_ID,
      GOOGLE_MAILER_CLIENT_SECRET
    );
    myOAuth2Client.setCredentials({
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    const mailOptions = {
      to: "tientung4700@gmail.com",
      subject: "T-Wine",
      html: `<h3>hello</h3>`,
    };
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
