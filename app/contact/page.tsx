import Balancer from 'react-wrap-balancer';
import { ContactForm } from './components/contact-form';

const ContactPage = () => (
  <div className="grid grid-cols-2 gap-8 divide-x">
    <div className="p-8">
      <h1 className="font-bold text-5xl leading-tight tracking-tight">
        <Balancer>Let&apos;s talk about your next project.</Balancer>
      </h1>
    </div>
    <div className="p-8">
      <ContactForm />
    </div>
  </div>
);

export default ContactPage;
