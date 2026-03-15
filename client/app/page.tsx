"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllUsersReq } from "@/soapStructure/soap";
import { Builder, parseStringPromise } from "xml2js";
import GrowingPlant from "@/components/GrowingPlant";
import { axiosInstance } from "@/utils/axios";

type NewUserType = {
  name: string;
  age: number;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState([]);
  const builder = new Builder({ headless: true });

  const [newUser, setNewUser] = useState<NewUserType>({
    name: "",
    age: 0,
    email: "",
  });

  const newUserHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const getAllUsers = async () => {
    const res = await axiosInstance.post(
      "/",
      builder.buildObject(fetchAllUsersReq),
    );

    const jsonRes = await parseStringPromise(res.data);
    const users =
      jsonRes["soap:Envelope"]["soap:Body"][0].listUsersResponse[0].user;
    const restructuredUsers = users.map((u) => ({
      age: +u.age[0],
      email: u.email[0],
      id: u.id[0],
      name: u.name[0],
    }));

    setUsers(restructuredUsers);
  };

  const createUserHandler = async () => {
    const createUserReqBody = `
      <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <createUserRequest>
            <name>${newUser.name}</name>
            <age>${newUser.age}</age>
            <email>${newUser.email}</email>
          </createUserRequest>
        </soap:Body>
      </soap:Envelope>
    `;

    const res = await axiosInstance.post("/", createUserReqBody);
    console.log(res);

    if (res.statusText === "OK") {
      getAllUsers();
      setNewUser({
        name: "",
        age: 0,
        email: "",
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Users CRUD</h1>

        {/* Create User */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl mb-4">Create User</h2>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <input
              className="bg-gray-700 p-2 rounded"
              placeholder="Name"
              name="name"
              onChange={newUserHandler}
              value={newUser.name}
            />

            <input
              className="bg-gray-700 p-2 rounded"
              placeholder="Email"
              name="email"
              onChange={newUserHandler}
              value={newUser.email}
            />

            <input
              value={newUser.age}
              className="bg-gray-700 p-2 rounded"
              placeholder="Age"
              name="age"
              onChange={newUserHandler}
            />
          </div>

          <button
            onClick={createUserHandler}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((u) => (
                <tr key={u?.id} className="border-t border-gray-700">
                  <td className="p-3">{u?.name}</td>
                  <td className="p-3">{u?.email}</td>
                  <td className="p-3">{u?.age}</td>
                  <td className="p-3 space-x-2">
                    <button className="bg-green-600 px-3 py-1 rounded">
                      Edit
                    </button>

                    <button className="bg-red-600 px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
