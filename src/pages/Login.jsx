import React from 'react'
import {TextField} from '@mui/material';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { authLoginApi } from '../services/users';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const authLogin = async() => {
    const dataUser = {
        email: email,
        password: password
    }
    const response = await authLoginApi(dataUser);
    console.log("response", response)
    if (response.code > 299){
      Swal.fire(
        'Warning!',
        'Your email and password do not match. Please try again.',
        'warning'
      )
    }else{
      Cookies.set('userSession', JSON.stringify(response));
      window.location.href = '/';
    }
}

  document.title = 'MOM - Login';
  return (
    <>
    <section class="vh-100" style={{backgroundColor: "#b93c3c"}}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{borderRadius: "rem"}}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={'images/teamwork-2.jpg'}
                    alt="login form" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i class="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                        <span class="h1 mb-0"><Diversity2Icon fontSize='large' className='mb-2'/> <b>Meeting </b>Point</span>
                      </div>

                      <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign into your account</h5>
                      <div class="mb-4">
                        <TextField fullWidth label="Email address" id="email" value={email} onChange={handleEmailChange}/>
                      </div>

                      <div class="mb-4">
                        <TextField fullWidth label="Password" id="password" type='password' value={password} onChange={handlePasswordChange}/>
                      </div>

                      <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="button"  onClick={authLogin}>Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}