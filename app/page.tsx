"use client";

import { useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Toaster, toast } from "sonner";

type SmtpData = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

type MailData = {
  subject: string;
  mailBody: string;
  signature: string;
};

export default function Home() {
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState<string>("");

  const [sendingInProgress, setSendingInProgress] = useState<boolean>(false);
  const [mailData, setMailData] = useState<MailData>({
    subject: "",
    mailBody: "",
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

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Callback function when file is read
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result as string;
          // Split content by comma and remove double quotes
          const emailArray = content
            .split(",")
            .map((email) => email.trim().replace(/"/g, ""))
            .filter((email) => email !== "");
          setRecipientEmails(emailArray);
        }
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };

  const removeRecipient = (index: number) => {
    const updatedRecipients = [...recipientEmails];
    updatedRecipients.splice(index, 1);
    setRecipientEmails(updatedRecipients);
  };

  const sendEmails = async () => {
    setSendingInProgress(true);
    for (let i = 0; i < recipientEmails.length; i++) {
      const formData = {
        smtpData: smtpData,
        recipientEmail: recipientEmails[i],
        mailData: mailData,
      };

      try {
        const response = await axios.post("/api/sendEmails", formData);
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
      <div className="absolute top-0 inset-x-0">
        <Toaster richColors position="top-right" />
      </div>
      <div className="container mx-auto h-full flex flex-col lg:flex-row">
        {/* first div with smtp details */}

        <div className={`${smtpModel && "w-full"} p-4`}>
          <div className="w-full text-right">
            <button
              onClick={() => setSmtpModel((prev: any) => !prev)}
              className="bg-green-300 text-green-800 p-2.5 px-4 rounded-full border-0 outline-none whitespace-nowrap"
            >
              Configure Smtp
            </button>
          </div>
          {smtpModel && (
            <>
              <div className="lg:block hidden rounded-lg p-4 relative">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Configure Smtp</h1>
                  <XMarkIcon
                    onClick={() => setSmtpModel(false)}
                    className="w-7 h-7 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative tracking-wide">
                    <label className="text-sm" htmlFor="host">
                      Host
                    </label>
                    <input
                      type="text"
                      name="host"
                      value={smtpData.host}
                      className="w-full h-12 rounded border-2 outline-none px-4"
                      onChange={handleSmtpDataChange}
                    />
                  </div>
                  <div className="relative tracking-wide">
                    <label className="text-sm" htmlFor="port">
                      Port
                    </label>
                    <input
                      type="number"
                      name="port"
                      value={smtpData.port}
                      className="w-full h-12 rounded border-2 outline-none px-4"
                      onChange={handleSmtpDataChange}
                    />
                  </div>
                  <div className="relative tracking-wide">
                    <label className="text-sm" htmlFor="user">
                      User Email
                    </label>
                    <input
                      type="text"
                      name="user"
                      value={smtpData.user}
                      className="w-full h-12 rounded border-2 outline-none px-4"
                      onChange={handleSmtpDataChange}
                    />
                  </div>
                  <div className="relative tracking-wide">
                    <label className="text-sm" htmlFor="password">
                      User Password
                    </label>
                    <input
                      type="text"
                      name="pass"
                      value={smtpData.pass}
                      className="w-full h-12 rounded border-2 outline-none px-4"
                      onChange={handleSmtpDataChange}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:hidden fixed inset-0 bg-black/25 z-10 grid place-items-center p-4">
                <div className="bg-white p-4 rounded">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Configure Smtp</h1>
                    <XMarkIcon
                      onClick={() => setSmtpModel(false)}
                      className="w-7 h-7 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="relative tracking-wide">
                      <label className="text-sm" htmlFor="host">
                        Host
                      </label>
                      <input
                        type="text"
                        name="host"
                        value={smtpData.host}
                        className="w-full h-12 rounded border-2 outline-none px-4"
                        onChange={handleSmtpDataChange}
                      />
                    </div>
                    <div className="relative tracking-wide">
                      <label className="text-sm" htmlFor="port">
                        Port
                      </label>
                      <input
                        type="number"
                        name="port"
                        value={smtpData.port}
                        className="w-full h-12 rounded border-2 outline-none px-4"
                        onChange={handleSmtpDataChange}
                      />
                    </div>
                    <div className="relative tracking-wide">
                      <label className="text-sm" htmlFor="user">
                        User Email
                      </label>
                      <input
                        type="text"
                        name="user"
                        value={smtpData.user}
                        className="w-full h-12 rounded border-2 outline-none px-4"
                        onChange={handleSmtpDataChange}
                      />
                    </div>
                    <div className="relative tracking-wide">
                      <label className="text-sm" htmlFor="password">
                        User Password
                      </label>
                      <input
                        type="text"
                        name="pass"
                        value={smtpData.pass}
                        className="w-full h-12 rounded border-2 outline-none px-4"
                        onChange={handleSmtpDataChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
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
            <div className="relative mt-4 flex flex-col">
              <p className="px-2 py-1">
                Add multiple emails through a plain txt file
              </p>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
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
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Mail Heading"
                name="heading"
                value={mailData.heading}
                onChange={handleMailDataChange}
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div> */}
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Image Link"
                name="imageLink"
                value={mailData.imageLink}
                onChange={handleMailDataChange}
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div> */}
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Paragraph Text"
                name="text"
                value={mailData.text}
                onChange={handleMailDataChange}
                className="w-full h-12 border-2 outline-none rounded-full px-4 text-black"
              />
            </div> */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Mail body"
                name="mailBody"
                value={mailData.mailBody}
                onChange={handleMailDataChange}
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
