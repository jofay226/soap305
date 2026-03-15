"use client";
import { useEffect, useState } from "react";
import { fetchAllUsersReq } from "@/soapStructure/soap";
import { Builder, parseStringPromise } from "xml2js";
import { axiosInstance } from "@/utils/axios";

type NewUserType = {
  name: string;
  age: number | string;
  email: string;
};

type UserType = {
  id: string;
  name: string;
  age: number;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<UserType[]>([]);

  const builder = new Builder({ headless: true });

  const [newUser, setNewUser] = useState<NewUserType>({
    name: "",
    age: "",
    email: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<NewUserType & { id: string }>({
    id: "",
    name: "",
    age: "",
    email: "",
  });

  const newUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const editUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (user: UserType) => {
    setEditUser({
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditUser({
      id: "",
      name: "",
      age: "",
      email: "",
    });
  };

  const getAllUsers = async () => {
    const res = await axiosInstance.post(
      "/",
      builder.buildObject(fetchAllUsersReq),
    );

    const jsonRes = await parseStringPromise(res.data);
    const users =
      jsonRes["soap:Envelope"]["soap:Body"][0].listUsersResponse[0].user;

    const restructuredUsers = users.map((u: any) => ({
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

    if (res.statusText === "OK") {
      getAllUsers();
      setNewUser({
        name: "",
        age: "",
        email: "",
      });
    }
  };

  const deleteUserHandler = async (userId: string) => {
    const deleteUserReqBody = `
      <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <deleteUserRequest>
            <id>${userId}</id>
          </deleteUserRequest>
        </soap:Body>
      </soap:Envelope>
    `;

    const res = await axiosInstance.post("/", deleteUserReqBody);
    if (res.statusText === "OK") {
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Users CRUD</h1>
          <p className="mt-2 text-sm text-slate-600">
            Simple users management interface.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Create User */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Create User
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Name"
                  name="name"
                  onChange={newUserHandler}
                  value={newUser.name}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Email"
                  name="email"
                  onChange={newUserHandler}
                  value={newUser.email}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  value={newUser.age}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Age"
                  name="age"
                  onChange={newUserHandler}
                />
              </div>

              <button
                onClick={createUserHandler}
                className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Add User
              </button>
            </div>
          </section>

          {/* Users Table */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Users Table
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Read, edit, and delete users from this table.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        User
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Age
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    {users?.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80">
                        <td className="px-5 py-4">{u.name}</td>
                        <td className="px-5 py-4">{u.email}</td>
                        <td className="px-5 py-4">{u.age}</td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(u)}
                              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteUserHandler(u.id)}
                              className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Edit Modal UI Only */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Edit User
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update user information in the form below.
                </p>
              </div>

              <button
                onClick={closeEditModal}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  name="name"
                  value={editUser.name}
                  onChange={editUserHandler}
                  placeholder="Enter name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  value={editUser.email}
                  onChange={editUserHandler}
                  placeholder="Enter email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  name="age"
                  value={editUser.age}
                  onChange={editUserHandler}
                  placeholder="Enter age"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Update User
                </button>

                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
