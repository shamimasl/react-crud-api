import React from "react";
import { useState, useEffect } from "react";
import UserForm from "../../components/UserForm";
const url = "https://rest-api-without-db.herokuapp.com/users/";
export default function Home() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //update
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    email: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const getAllUsers = () => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.users);
        setUsers(data.users);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDelete = (id) => {
    fetch(url + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not delete");
        }
        getAllUsers();
      })

      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = (user) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw Error("could not create user");
        }
      })

      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);

    const filteredData = users.filter((user) => user.id === id);
    setSelectedUser({
      username: filteredData[0].username,
      email: filteredData[0].email,
    });
  };

  const handleUpdate = (user) => {
    fetch(url + `/${selectedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("failed to update");
        }
        getAllUsers();
        setUpdateFlag(false);
      })

      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1 className="text-black font-bold text-2xl text-center mt-5">
        User Management App
      </h1>

      <div>
        {updateFlag ? (
          <div className=" flex justify-center items-center my-5">
            <UserForm
              btnText="update User"
              selectedUser={selectedUser}
              handleSubmitData={handleUpdate}
            />
          </div>
        ) : (
          <div className=" flex justify-center items-center my-5">
            <UserForm btnText="Add User" handleSubmitData={addUser} />
          </div>
        )}
      </div>
      {isLoading && (
        <h1 className="text-red-900 text-center font-extrabold mt-10">
          Loading....
        </h1>
      )}
      {error && <h1>{error}</h1>}
      <div className=" grid grid-cols-4 gap-4 my-10 mx-10">
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article className=" bg-slate-700 p-5 shadow-lg rounded-md">
                <p className="text-white text-xl">{username}</p>
                <p className="text-white text-xl mb-5">{email}</p>
                <button
                  onClick={() => {
                    handleEdit(id);
                  }}
                  className=" bg-green-600 text-gray-200 uppercase text-xs font-bold mx-5 px-5 py-2 rounded-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(id);
                  }}
                  className=" bg-red-600 text-gray-200 uppercase text-xs font-bold mx-5 px-5 py-2 rounded-full"
                >
                  Delete
                </button>
              </article>
            );
          })}
      </div>
    </div>
  );
}
