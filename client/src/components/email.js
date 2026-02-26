import emailjs from '@emailjs/browser';

export function SendClaimEmail(username, firstName, itemName, location) {
  const _PUBLIC_KEY = import.meta.env.VITE_EMAILJS_KEY;
  const _SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICEID;
  const _TEMPLATE = import.meta.env.VITE_CLAIM_TEMPLATE;

  const templateParams = {
    email: username,
    name: firstName,
    item: itemName,
    currentLocation: location
  }
  //console.log(`${_PUBLIC_KEY} ${_SERVICE_ID} ${_TEMPLATE}`)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(_SERVICE_ID, _TEMPLATE, templateParams, {
        publicKey: _PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
};