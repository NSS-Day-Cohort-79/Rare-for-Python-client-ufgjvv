export const loginUser = (user) => {
<<<<<<< HEAD
  return fetch(
    `http://localhost:8088/users?username=${user.username}&password=${user.password}`,
  ).then((res) => res.json());
};
=======
  return fetch(`http://localhost:8088/users?username=${user.username}&password=${user.password}`).then(res => res.json())
}
>>>>>>> develop

export const registerUser = (newUser) => {
  return fetch("http://localhost:8088/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};
