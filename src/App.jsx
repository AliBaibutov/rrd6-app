import React from "react";
import { Link, Navigate, Outlet, useParams, useRoutes } from "react-router-dom";

const users = [
  {
    name: "User1",
    id: 1,
  },
  {
    name: "User2",
    id: 2,
  },
  {
    name: "User3",
    id: 3,
  },
  {
    name: "User4",
    id: 4,
  },
  {
    name: "User5",
    id: 5,
  },
];

const MainPage = () => (
  <>
    <h1>Main Page</h1>
    <Link to="/users">Users list page</Link>
  </>
);

const UsersListPage = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <Link to="/">Main Page</Link>
      <h1>Users List Page</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`${user.id}/profile`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

const UserPage = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <li>
          <Link to="edit">Edit this user</Link>
        </li>
      </ul>
      <Outlet />
      <p>UserId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const params = useParams();
  const { userId } = params;
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User Profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
        </li>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </>
  );
};

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "users",
    element: <UsersListPage />,
    children: [
      {
        path: ":userId/profile",
        element: <UserPage />,
        children: [
          {
            path: "edit",
            element: <EditUserPage />,
          },
          {
            path: "*",
            element: <Navigate to="/" />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const App = () => {
  const params = useParams();
  console.log(params);
  const elements = useRoutes(routes);
  return (
    <>
      <h1>App</h1>
      {elements}
    </>
  );
};

export default App;
