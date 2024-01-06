import React, { useState } from 'react'
import ApiCall from './ApiCall';
import {
  EuiFieldText,
  EuiFormLabel,
  EuiText,
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiProvider,
  EuiListGroup,
  EuiListGroupItem,
  EuiImage
} from "@elastic/eui";
import nsrcLogo from '../../util/images/nsrc_logo.png';

const Login = () => {
  const { http, setToken } = ApiCall();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const submitForm = () => {
    setError(null);
    http.post('/auth/login', { email: email, password: password })
      .then((res) => {
        setToken(res.data.user, res.data.access_token);
      })
      .catch((e) => {
        if (e.response?.data?.status === "error") {
          setError(e.response?.data?.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  }

  return (
    <EuiProvider>
        <div className='login-content' style={{ boxShadow: "4px 4px 20px 0px rgba(0, 0, 0, 0.25)", height: "72vh"}}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
                <EuiImage
                  style={{ height: "100px", marginTop: "30px"}}
                  src={nsrcLogo}
                />
                <EuiText size='m' style={{ fontSize:"18px" }}>Facility Login</EuiText>
                {error && (
                  <EuiCallOut
                    color="danger"
                  >
                    {<p style={{ color: "#BD271E" }}>{error}</p>}
                  </EuiCallOut>
                )}

                <div style={{ width: "80%" }}>
                  <EuiFormLabel>Email or Username</EuiFormLabel>
                  <EuiFieldText
                    onChange={e => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    style={{
                      border: "1px solid #D3D3D3",
                      borderRadius: "4px",
                      height: "42px",
                      width: "100%"
                    }}
                  />
                </div>
                <div style={{ width: "80%", position:"relative" }}>
                  <EuiFormLabel>Password</EuiFormLabel>
                  <EuiFieldPassword
                    onChange={e => setPassword(e.target.value)}
                    type="dual"
                  />
                </div>
                <EuiButton
                  style={{
                    borderRadius: "2.813px",
                    width: "80%",
                    color: "#FFFFFF",
                    backgroundColor: "#01B5AC",
                    border: "0px",
                    marginTop: "20px"
                  }}
                  onClick={submitForm}
                >
                  Login
                </EuiButton>
                
            </div>

        </div>
        <div className="policy-container" style={{ marginTop:"20px", borderRadius: "4px", boxShadow: "4px 4px 20px 0px rgba(0, 0, 0, 0.25)" }}>
          <div>
            <EuiListGroup gutterSize="s">
              <div style={{  display:"flex" }}>
                <EuiListGroupItem label="Privacy Policy" iconType="dot" href="#link1" color="primary"/>
                <EuiListGroupItem label="Terms and Condition" iconType="dot" href="#link2" color="primary"/>
              </div>
            </EuiListGroup>
          </div>
          <div>
            <EuiListGroupItem label="Contact Us" iconType="dot" href="#link3" color="primary"/>
          </div>
        </div>
    </EuiProvider>
  )
}

export default Login;
