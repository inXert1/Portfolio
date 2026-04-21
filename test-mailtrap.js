// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: 'api',
    pass: '5b5ee02c78c87df317d4f1a2da59fc83'
  }
});

transporter.sendMail({
  from: 'Portfolio Contact <hello@demomailtrap.co>',
  to: 'vinceestander3@gmail.com',
  replyTo: 'test@example.com',
  subject: 'Test from Portfolio',
  text: 'Test message body',
  html: '<p>Test message body</p>'
}).then(info => {
  console.log('SUCCESS:', info.messageId);
  console.log('Response:', info.response);
}).catch(e => {
  console.error('SEND ERROR:', e.message);
  console.error('Response code:', e.responseCode);
  if (e.response) console.error('Server response:', e.response);
});
