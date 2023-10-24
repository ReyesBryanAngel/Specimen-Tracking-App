import React, { useEffect, useState } from 'react'
import ApiCall from './ApiCall';
import {
  EuiFieldText,
  EuiTitle,
  EuiFormLabel,
  EuiText,
  EuiButton,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon
} from "@elastic/eui";

const Login = () => {
  const { http, setToken } = ApiCall();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


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
    <div className='main-content'>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
        <EuiTitle><h3>NSF</h3></EuiTitle>
        <EuiText size='m'>Facility Login</EuiText>

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
              height: "32px",
              width: "100%"
            }}
          />
        </div>
        <div style={{ width: "80%", position:"relative" }}>
          <EuiFormLabel>Password</EuiFormLabel>
          <EuiFieldText
            onChange={e => setPassword(e.target.value)}
            id="password"
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            style={{
              border: "1px solid #D3D3D3",
              borderRadius: "4px",
              height: "32px",
              width: "91%",
              paddingLeft: '30px',
            }}
            append={
              <EuiFlexGroup gutterSize="l" style={{ position: "absolute", right: 4, bottom: 9 }}>
                <EuiFlexItem grow={false}>
                  <EuiIcon
                    type={isPasswordVisible ? "eyeClosed" : "eye"}
                    onClick={togglePasswordVisibility}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            }
            prepend={
              <EuiFlexGroup gutterSize="l" style={{ position: "absolute", left: 6, bottom: 9 }}>
                <EuiFlexItem grow={false}>
                  <EuiIcon type="lock" />
                </EuiFlexItem>
              </EuiFlexGroup>
            }
          />
        </div>
        <EuiButton
          style={{
            borderRadius: "2.813px",
            width: "80%",
            color: "#FFFFFF",
            backgroundColor: "#01B5AC",
            border: "0px",
          }}
          onClick={submitForm}
        >
          Login
        </EuiButton>
      </div>
    </div>
  )
}

export default Login;
