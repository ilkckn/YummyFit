import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_qfnfn36', 
      'template_xjdy6zp', 
      e.target, 
      '1vziUxMWWjHuBFgX5'
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      alert('Thank you for reaching out! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, (error) => {
      console.error('FAILED...', error.text);
      alert('Something went wrong. Please try again later.');
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
      <form onSubmit={sendEmail} className="space-y-4">
        {/* Hidden input for sending time */}
        <input
          type="hidden"
          name="time"
          value={new Date().toLocaleString()}
        />

        <div>
          <label className="block mb-1 font-medium text-white">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black text-white "
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-black text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded p-2 text-blac text-white"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
