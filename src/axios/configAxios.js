import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token')

axios.interceptors.response.use(config=>{
    axios.defaults.headers.common['token'] = localStorage.getItem('token')
    return config;
  }, err=> {
    // Do something with request error
    console.log("algo salio mal en axios")
    if (err.response.status === 403) {
        console.log(err.response)
      alert(err.response.data.error)
      localStorage.removeItem('token')
      window.location.href = '/';
    }if (err.response.status === 400){
      window.location.href = '/dashboard2'
    }
  });
