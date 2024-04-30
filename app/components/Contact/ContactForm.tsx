import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  accept?: string;  
}

const ContactForm = ({ currentMode }) => {
  return (
    <div className="email-container">
      <form>
        <FormInput label="First Name" name="firstname" placeholder="Your name.." />
        <FormInput label="Last Name" name="lastname" placeholder="Your last name.." />
        <FormInput label="E-mail" name="email" placeholder="Your e-mail address.." />
        <FormInput label="Subject" name="subject" placeholder="Subject" />
        <FormInput label="Message" name="message" placeholder="Write something.." isTextarea={true} />
        <FormInput label="Select a file" name="myfile" type="file" accept="image/*" />
        <input id="contact-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

const FormInput: React.FC<FormInputProps> = ({ label, name, placeholder, type = "text", isTextarea = false, accept }) => (
  <label htmlFor={name}>
    {label}:
    {isTextarea ? (
      <textarea id={name} name={name} placeholder={placeholder} />
    ) : (
      <input type={type} id={name} name={name} placeholder={placeholder} accept={accept} />
    )}
  </label>
);

export default ContactForm;