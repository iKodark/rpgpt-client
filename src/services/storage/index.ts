const getAccessToken = () => {
  return localStorage.getItem("access_token");
}

const setAccessToken = (value: string) => {
  return localStorage.setItem("access_token", value);
}

export {
  getAccessToken,
  setAccessToken
}