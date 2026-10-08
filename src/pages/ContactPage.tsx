import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Question');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title="Contact Fitnshape | Editorial Desk & Reader Support"
        description="Get in touch with the Fitnshape editorial desk, submit science feedback, or inquire about press partnerships."
        pageType="contact"
      />

      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Contact Us', active: true },
            ]}
            className="text-emerald-200/80 mb-3"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
            Get In Touch
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-1 mb-2">
            Contact the Fitnshape Editorial Desk
          </h1>
          <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
            Have a question on an article, a correction for our clinical reviewers, or interested in contributing? We read every message.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#132E22]">
              Direct Inquiries
            </h3>

            <div className="space-y-3 text-xs text-[#64746B]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E06B43] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#132E22]">General Editorial Desk:</strong>
                  editorial@fitnshape.in
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#4A6B56] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#132E22]">Medical & Clinical Corrections:</strong>
                  clinical-review@fitnshape.in
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#132E22] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#132E22]">Publication Headquarters:</strong>
                  Fitnshape Media, Digital Wellness Publishing
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#EBF1EC] p-6 rounded-2xl border border-[#D5DFD8] text-xs text-[#334D3D] space-y-2">
            <h4 className="font-bold text-[#132E22]">Fact-Checking Standards</h4>
            <p>
              If you believe a study citation or nutritional statistic requires an erratum or clarification, please include the URL and referenced DOI in your inquiry.
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D5DFD8] shadow-sm">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-editorial text-2xl font-bold text-[#132E22] mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-[#64746B] mb-4">
                  Fill in your details below and our team will respond within 24 to 48 hours.
                </p>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#132E22] mb-1">
                    Your Name <span className="text-[#E06B43]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#132E22] mb-1">
                    Your Email <span className="text-[#E06B43]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#132E22] mb-1">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22]"
                  >
                    <option value="Editorial Question">Editorial Question or Feedback</option>
                    <option value="Clinical Correction">Medical/Study Correction</option>
                    <option value="Recipe Suggestion">Recipe Feedback</option>
                    <option value="Press & Partnerships">Press or Partnership Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#132E22] mb-1">
                    Message <span className="text-[#E06B43]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your note or question here..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#E06B43]" />
                  <span>Send Message to Editorial Team</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#4A6B56] max-w-sm mx-auto">
                  Thank you, {name}. Our editorial team has received your submission and will get back to you at {email}.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="py-2 px-4 rounded-lg bg-[#FAF8F5] border border-[#D5DFD8] text-xs font-semibold text-[#132E22] hover:bg-[#EBF1EC]"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
