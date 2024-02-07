"use client";

import { useState } from "react";

export default function UploadFile() {
  const [emails, setEmails] = useState<string[]>([]);

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
          setEmails(emailArray);
        }
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <div>
        <h2>Uploaded Emails:</h2>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
