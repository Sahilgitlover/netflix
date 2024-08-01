import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  verifyCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verifyCode
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <div>Please use this code to verify:</div>
    <h1>{verifyCode}</h1>
  </div>
);
