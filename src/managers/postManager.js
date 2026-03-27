export const postPost = (post) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const getUserPostsByToken = (token) => {
  return fetch(
    `http://localhost:8088/posts?user_id=${token}&_expand=user&_expand=category`,
  ).then((res) => res.json());
};

export const getAllPosts = () => {
  return fetch(
    "http://localhost:8088/posts?_expand=user&_expand=category",
  ).then((res) => res.json());
};
