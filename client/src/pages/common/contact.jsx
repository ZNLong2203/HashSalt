import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const ContactPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="relative w-full h-72">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/016/840/429/small/memphis-blue-background-with-halftone-and-line-elements-for-wallpaper-web-banner-or-landing-page-vector.jpg"
          alt="Contact Us"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-6 py-12 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FaPhoneAlt className="text-4xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-700">0826568888</p>
          </div>
          <div>
            <FaEnvelope className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-700">nlong2232003@gmail.com</p>
          </div>
          <div>
            <FaMapMarkerAlt className="text-4xl text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-700">Cau Giay, Ha Noi</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='shadow-xl py-10'>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-96">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormLabel>Gmail</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                        <textarea
                        id="message"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Message"
                        rows="5"
                        ></textarea>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
            </form>
        </Form>
      </div>
                
      {/* Google Map Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Our Location</h2>
        <div className="w-full h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7392077634167!2d105.7920142927367!3d21.04311847652709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab2e502797db%3A0xf11eba5537845625!2zQ-G6p3UgZ2nhuqV5IGjDoCBu4buZaQ!5e0!3m2!1svi!2s!4v1723374096502!5m2!1svi!2s"
            title="Google Map"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
