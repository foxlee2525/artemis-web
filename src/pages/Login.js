import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      submit(e);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      console.log(res.data);
      // 儲存 Token
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      setLoginState(error.response.data);
    }
  };

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h2 className='fw-bold'>彌絲 後台帳號登入</h2>

          <div
            className={`alert alert-danger ${
              loginState.message ? "d-block" : "d-none"
            }`}
            role='alert'
          >
            {loginState.message}
          </div>
          <form onSubmit={submit}>
            <div className='mb-2'>
              <label htmlFor='email' className='form-label w-100'>
                Email
                <input
                  id='email'
                  className='form-control'
                  name='username'
                  type='email'
                  placeholder='name@example.com'
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='mb-2'>
              <label htmlFor='password' className='form-label w-100'>
                密碼
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  id='password'
                  placeholder='password'
                  onChange={handleChange}
                />
              </label>
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={submit}
              onKeyUp={handleKeyUp}
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
