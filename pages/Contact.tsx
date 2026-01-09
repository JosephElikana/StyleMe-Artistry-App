import React from 'react';
import { Button, Input, TextArea } from '../components/UI';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">Get in Touch</h1>
        <p className="text-neutral-500 text-center mb-12">
          Interested in a commission or have a question about a piece? We'd love to hear from you.
        </p>

        <form className="space-y-6 bg-neutral-900/30 p-8 md:p-12 border border-neutral-800 rounded-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Name</label>
              <Input placeholder="Jane Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Email</label>
              <Input placeholder="jane@example.com" type="email" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Subject</label>
             <select className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 px-4 py-3 rounded-sm focus:border-white focus:outline-none transition-colors">
                <option>General Inquiry</option>
                <option>Purchase Inquiry</option>
                <option>Commission Request</option>
                <option>Press</option>
             </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Message</label>
            <TextArea rows={6} placeholder="Tell us about your project or inquiry..." required />
          </div>

          <Button type="submit" size="lg" className="w-full">Send Message</Button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm">
           <div>
              <h3 className="text-white font-medium mb-2">Studio</h3>
              <p className="text-neutral-500">123 Art District Ave<br/>New York, NY 10012</p>
           </div>
           <div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-neutral-500">hello@styleme.artist<br/>press@styleme.artist</p>
           </div>
           <div>
              <h3 className="text-white font-medium mb-2">Socials</h3>
              <p className="text-neutral-500">@styleme.artist</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;