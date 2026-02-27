import emailjs from '@emailjs/browser';

const _PUBLIC_KEY = import.meta.env.VITE_EMAILJS_KEY;
const _SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICEID;

export function SendClaimEmail(username, firstName, itemName, location) {
  const _TEMPLATE = import.meta.env.VITE_CLAIM_TEMPLATE;

  emailjs.init({
    publicKey: _PUBLIC_KEY
  });

  const templateParams = {
    email: username,
    name: firstName,
    item: itemName,
    currentLocation: location
  }

    emailjs
      .send(_SERVICE_ID, _TEMPLATE, templateParams)
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
};

export function SendAdminFeedbackEmail(username, firstName, itemName, rejectionReason, adminFeedback) {
  const _TEMPLATE = import.meta.env.VITE_ADMINFEEDBACK_TEMPLATE;

  emailjs.init({
    publicKey: _PUBLIC_KEY
  });

  const templateParams = {
    email: username,
    name: firstName,
    item: itemName,
    reason: rejectionReason,
    feedback: adminFeedback
  }

    emailjs
      .send(_SERVICE_ID, _TEMPLATE, templateParams)
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
};