const BASE_URL = 'http://localhost:8080/api';

const getData = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());

export const getMessages = () => getData('/messages');

export const addNewMessage = (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  return fetch(`${BASE_URL}/messages`, options)
    .then(response => response.json());
};
