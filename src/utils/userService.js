import axios from 'axios';

async function logIn (userName, password) {

  //Fetch Request Objects
  const data = {
    email: `${userName}`,
    password: `${password}`
  };

  const appJson = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const xAuth = value => {
    let obj = {
      headers: {
        'x-auth-token': value,
      }
    }
    return obj;
  };

  let token = ""

  let userData = null;

  let errorMessage = null;

  //Determine if token is valid
  await axios.post('http://localhost:4000/auth', data, appJson)
    .then((res) => {
      token = xAuth(res.data.token);
    })
    .catch((err) => {
      //This message will have to be the error for an incorrect password
      console.log("ERROR: ====", err);
    })
  //Retrieve user data with token
  await axios.get('http://localhost:4000/auth', token)
    .then((res) => {
      userData = res;
    })
    .catch((err) => {
      //This message will have to be the error for an incorrect password
      console.log("ERROR: ====", err);
    })

  let obj = {
    firstname: userData.data.firstname,
    lastname: userData.data.lastname,
    email: userData.data.email,
    avatar: userData.data.avatar
  }

  return errorMessage === null ? obj : errorMessage
}

async function signUp (signUpForm) {

  //Fetch Request Objects
  const data = {...signUpForm};

  const appJson = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const xAuth = value => {
    let obj = {
      headers: {
        'x-auth-token': value,
      }
    }
    return obj;
  };

  let token = ""

  let userData = null;

  let errorMessage = null;

  //Determine if token is valid
  await axios.post('http://localhost:4000/users/add', data, appJson)
    .then((res) => {
      token = xAuth(res.data.token);
    })
    .catch((err) => {
      //This message will have to be the error for an incorrect password
      console.log("ERROR: ====", err);
    })
  //Retrieve user data with token
  await axios.get('http://localhost:4000/auth', token)
    .then((res) => {
      userData = res;
    })
    .catch((err) => {
      //This message will have to be the error for an incorrect password
      console.log("ERROR: ====", err);
    })

  let obj = {
    firstname: userData.data.firstname,
    lastname: userData.data.lastname,
    email: userData.data.email,
    avatar: userData.data.avatar
  }

  return errorMessage === null ? obj : errorMessage
}


export default {
  logIn,
  signUp
};
