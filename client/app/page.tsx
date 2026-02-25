"use client";
import axios from "axios";

const getUsersReq = `
    <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/" >
      <soap:Header>
      </soap:Header>
      <soap:Body>
        <usersRequest>getAllUsers</usersRequest>
      </soap:Body>
    </soap:Envelope>
`;

export default function Home() {
  const getUsersHandler = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/soap",
      getUsersReq,
      {
        headers: {
          "Content-Type": "text/xml",
        },
      },
    );
    console.log(res);
  };

  return (
    <button
      onClick={getUsersHandler}
      className="px-5 py-2.5 bg-amber-600 rounded-full"
    >
      get all users
    </button>
  );
}
