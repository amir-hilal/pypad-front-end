export const authLocal = {
  
    saveToken: (token) => {
      localStorage.setItem("token", token);
    },
    getToken: () => {
      return localStorage.token;
    },
    saveEmail: (email) => {
        localStorage.email = email
    },
    getEmail: () => {
        return localStorage.email
    },
    saveUsername: (username) => {
        localStorage.setItem("username", username)
    },
    getUsername: () => {
        return localStorage.username
    }

  };
  