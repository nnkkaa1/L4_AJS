function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
}

function getPostsCallback() {
  return new Promise((resolve) => {
    getData("https://jsonplaceholder.typicode.com/posts", (err, posts) => {
      if (err) {
        console.log("Ошибка:", err);
        resolve();
        return;
      }
      posts.sort((a, b) => b.title.length - a.title.length);
      console.log("Посты по убыванию длины title:");
      console.log(posts.slice(0, 5));
      resolve();
    });
  });
}

function getCommentsCallback() {
  return new Promise((resolve) => {
    getData(
      "https://jsonplaceholder.typicode.com/comments",
      (err, comments) => {
        if (err) {
          console.log("Ошибка:", err);
          resolve();
          return;
        }
        comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log("Комментарии по имени автора:");
        console.log(comments.slice(0, 5));
        resolve();
      },
    );
  });
}

function getUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
      const result = users.map(({ id, name, username, email, phone }) => ({
        id,
        name,
        username,
        email,
        phone,
      }));
      console.log("Пользователи (только нужные поля):");
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    });
}

function getTodosPromise() {
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((todos) => {
      const result = todos.filter((todo) => !todo.completed);
      console.log("Невыполненные задачи:");
      console.log(result.slice(0, 5));
      return result;
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    });
}

async function getPostsAsync() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    posts.sort((a, b) => b.title.length - a.title.length);
    console.log("Посты (async/await) по убыванию длины title:");
    console.log(posts.slice(0, 5));
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

async function getCommentsAsync() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");
    const comments = await res.json();
    comments.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Комментарии (async/await) по имени автора:");
    console.log(comments.slice(0, 5));
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

async function getUsersAsync() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    const result = users.map(({ id, name, username, email, phone }) => ({
      id,
      name,
      username,
      email,
      phone,
    }));
    console.log("Пользователи (async/await), только нужные поля:");
    console.log(result);
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

async function getTodosAsync() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    const result = todos.filter((todo) => !todo.completed);
    console.log("Невыполненные задачи (async/await):");
    console.log(result.slice(0, 5));
  } catch (err) {
    console.log("Ошибка:", err);
  }
}

async function main() {
  await getPostsCallback();
  await getCommentsCallback();
  await getUsersPromise();
  await getTodosPromise();
  await getPostsAsync();
  await getCommentsAsync();
  await getUsersAsync();
  await getTodosAsync();
}

main();
