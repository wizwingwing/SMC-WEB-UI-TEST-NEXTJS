import axios from 'axios'
import jwt from 'jsonwebtoken';

const baseUrl = process.env.BASEURL

interface ResponseAuth {
    token: string,
    refreshToken: string,
}

export const refreshToken = async () => {
    const response: ResponseAuth = await axios
    .post(`${baseUrl}/auth/refreshtoken`,
      { refreshToken: sessionStorage.getItem('refreshToken') },
      { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') }}
    )
    .then(response => response.data)
    .catch(error => error);

  if (response.token) {
    sessionStorage.setItem('token', response.token);
    return response.token;
  } else return false;
}

const OneTimeLoadingBeforeLogin = async () => {
    
}

export const Login = async (body) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(body));
    }
    const response: ResponseAuth = await axios.get(baseUrl + '/auth/login', body).then(result => result.data).catch(err => err);
    const token = response?.token
    const refreshToken = response?.refreshToken

    if (token) {
        const decoded = jwt.decode(response.token);
        sessionStorage.setItem('id', decoded._id);
        sessionStorage.setItem('email', decoded.email);
        sessionStorage.setItem('firstName', decoded.firstName);
        sessionStorage.setItem('lastName', decoded.lastName);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('refreshToken', refreshToken);
    }
    let success = await OneTimeLoadingBeforeLogin()
    return success
}

export const get = async (param) => {
    let response
    response = await axios.get(baseUrl + param, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
    })
    .then(response => response.data)
    .catch(err => console.log(err))

    if (response.data) {
        return response.data
    } else if (response?.response?.status === 401) {
        const token = await refreshToken();
        response = await axios.get(baseUrl + param, {
            headers: {
              Authorization: 'Bearer ' + token
            },
        })
        .then(response => response.data)
        .catch(err => console.log(err))

        if (response.data) return response.data
    } else return false
}

