"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/16/solid";

type SmtpData = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

type MailData = {
  subject: string;
  heading: string;
  imageLink: string;
  text: string;
  signature: string;
};

export default function Home() {
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState<string>("");

  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const [mailData, setMailData] = useState<MailData>({
    subject: "",
    heading: "",
    imageLink: "",
    text: "",
    signature: "",
  });
  const handleMailDataChange = (e: any) => {
    const { name, value } = e.target;
    setMailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [smtpModel, setSmtpModel] = useState<boolean>(false);
  const [smtpData, setSmtpData] = useState<SmtpData>({
    host: "",
    port: 465,
    secure: true,
    user: "",
    pass: "",
  });
  const handleSmtpDataChange = (e: any) => {
    const { name, value } = e.target;
    setSmtpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addRecipient = () => {
    if (newRecipient.trim() !== "") {
      setRecipientEmails((prevEmails) => [...prevEmails, newRecipient]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (index: number) => {
    const updatedRecipients = [...recipientEmails];
    updatedRecipients.splice(index, 1);
    setRecipientEmails(updatedRecipients);
  };

  const sendEmails = async () => {
    // console.log("button clicked!!!");
    setSendingInProgress(true);
    for (let i = 0; i < recipientEmails.length; i++) {
      // console.log("Loop started...");
      const formData = {
        smtpData: smtpData,
        recipientEmail: recipientEmails[i],
        mailData: mailData,
      };
      try {
        const response = await axios.post("/api/sendEmails", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);

        if (response.status === 200) {
          toast.success(response.data.recipientEmail);
          console.log(`Email sent to ${recipientEmails[i]} successfully!`);
          setRecipientEmails((prevEmails) =>
            prevEmails.filter((email) => email !== recipientEmails[i])
          );
        }
      } catch (error) {
        console.error("Error sending emails", error);
      }

      // Wait for 10 seconds before sending the next email
      await new Promise((resolve) => setTimeout(resolve, 10000));
      // console.log("Loop Ended...");

      // if it is the last email in the list, set sendingInProgress to false
      if (i === recipientEmails.length - 1) {
        setSendingInProgress(false);
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendEmails();
  };

  return (
    <div className="w-full h-screen">
      <ToastContainer />
      <div className="container mx-auto h-full flex flex-col lg:flex-row">
        {/* first div with smtp details */}
        <div className={`${smtpModel && "w-full"} p-4`}>
          <div className="w-full text-right py-4">
            <button
              onClick={() => setSmtpModel((prev: any) => !prev)}
              className="bg-green-300 text-green-800 p-2.5 px-4 rounded-full border-0 outline-none whitespace-nowrap"
            >
              Configure Smtp
            </button>
          </div>
          {smtpModel && (
            <div className="rounded-lg p-4 relative">
              <div className="flex flex-col gap-4">
                <div className="relative tracking-wide">
                  <label className="text-sm ml-4" htmlFor="host">
                    Host
                  </label>
                  <input
                    type="text"
                    name="host"
                    value={smtpData.host}
                    className="w-full h-12 rounded-full border-2 outline-none px-4"
                    onChange={handleSmtpDataChange}
                  />
                </div>
                <div className="relative tracking-wide">
                  <label className="text-sm ml-4" htmlFor="port">
                    Port
                  </label>
                  <input
                    type="number"
                    name="port"
                    value={smtpData.port}
                    className="w-full h-12 rounded-full border-2 outline-none px-4"
                    onChange={handleSmtpDataChange}
                  />
                </div>
                <div className="relative tracking-wide">
                  <label className="text-sm ml-4" htmlFor="user">
                    User Email
                  </label>
                  <input
                    type="text"
                    name="user"
                    value={smtpData.user}
                    className="w-full h-12 rounded-full border-2 outline-none px-4"
                    onChange={handleSmtpDataChange}
                  />
                </div>
                <div className="relative tracking-wide">
                  <label className="text-sm ml-4" htmlFor="password">
                    User Password
                  </label>
                  <input
                    type="text"
                    name="pass"
                    value={smtpData.pass}
                    className="w-full h-12 rounded-full border-2 outline-none px-4"
                    onChange={handleSmtpDataChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* second div with submit handler */}
        <div className="w-full p-4 mt-4">
          <h1 className="text-2xl text-center font-medium">
            Send Multiple Emails
          </h1>
          <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
            <div className="relative mt-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Recipient Email"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
              <button
                type="button"
                onClick={addRecipient}
                className="absolute right-1 inset-y-1 px-7 bg-green-300 text-green-800 font-medium rounded-full"
              >
                Add
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={mailData.subject}
                onChange={handleMailDataChange}
                required
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Mail Heading"
                name="heading"
                value={mailData.heading}
                onChange={handleMailDataChange}
                required
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Image Link"
                name="imageLink"
                value={mailData.imageLink}
                onChange={handleMailDataChange}
                required
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Paragraph Text"
                name="text"
                value={mailData.text}
                onChange={handleMailDataChange}
                required
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Signature"
                name="signature"
                value={mailData.signature}
                onChange={handleMailDataChange}
                required
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div>
            {recipientEmails.length > 0 && (
              <button
                type="submit"
                disabled={sendingInProgress}
                className="w-full h-12 border-0 outline-none bg-green-300 text-green-800 rounded-full mt-4"
              >
                {sendingInProgress ? "Sending..." : "Send Emails"}
              </button>
            )}
          </form>
        </div>
        <div className="bg-gray-100 w-full p-4 overflow-y-scroll container-snap">
          <div className="py-4">
            <div>
              <p>Mail Subject:</p>
              <p>{mailData.subject}</p>
            </div>
            {recipientEmails.map((email: string, index: number) => (
              <div
                key={index}
                className="relative flex items-center justify-between my-4 border-2 rounded-md p-2"
              >
                <p>{email}</p>
                {!sendingInProgress && (
                  <button
                    type="button"
                    onClick={() => removeRecipient(index)}
                    className="bg-rose-300 text-rose-800 p-0.5 top-0 right-0 absolute rounded"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
