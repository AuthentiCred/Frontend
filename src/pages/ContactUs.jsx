import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" color="blue-gray" className="mb-2">
              Contact Us
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Typography variant="lead" color="gray" className="mb-8">
              Have questions about our Blockchain Resume Verification Platform? We'd love to hear from you.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Contact Information and Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Typography variant="h5" color="blue-gray" className="mb-6">
                Contact Information
              </Typography>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-xl">📍</span>
                  <Typography color="gray">
                    SCTR's Pune Institute of Computer Technology
                    Dhankawadi, Pune – 43
                  </Typography>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-xl">📞</span>
                  <Typography color="gray">+91 (020) 24371101</Typography>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-xl">✉️</span>
                  <Typography color="gray">support@bbrvp.tech</Typography>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Textarea
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-12"
        >
          <Card className="w-full h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <iframe
              title="PICT Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5761897254596!2d73.84863731484193!3d18.457542787445386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x871eddd0a8a0a108!2sPune%20Institute%20of%20Computer%20Technology!5e0!3m2!1sen!2sin!4v1644856478761!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;