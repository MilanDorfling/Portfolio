import React, { useState } from "react";
import { motion } from "motion/react";
import { FileUpload } from "@/app/UI/File-download";
import { GridPattern } from "@/app/components/svg/GridPattern";

export default function ContactSection({ id }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden rounded-4xl"
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-full w-full mask-[radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
          <GridPattern />
        </div>
      </div>

      {/* Foreground */}
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16 xl:px-20 xl:py-20">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s work together
          </h2>
        </motion.div>

        {/* Two-column grid — stacks on mobile, side-by-side from md */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — CV Download */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-lg font-medium text-white mb-2">My CV</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Want a quick overview of my skills and experience? Download my CV below.
              </p>
            </div>
            <FileUpload />
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium text-white mb-6">Send a message</h3>
            <div className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@gmail.com"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-neutral-500 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you working on?"
                  rows={5}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-2 w-full rounded-lg border border-white/20 bg-white text-black text-sm font-medium py-3 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send message"}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-400 text-center">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}