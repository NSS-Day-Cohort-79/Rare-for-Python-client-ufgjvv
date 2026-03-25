<<<<<<< HEAD
const API = "http://localhost:8088";

export const getTags = () => {
  return fetch(`${API}/tags`).then((res) => res.json());
};

export const createTag = (tag) => {
  return fetch(`${API}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  }).then((res) => res.json());
};
=======
export const getTags = () => {
    return fetch("http://localhost:8088/tags").then(res => res.json())
}
>>>>>>> develop
