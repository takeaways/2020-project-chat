import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    ${reset}

    .auth-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
}

.auth-wrapper form {
  width: 375px;
  margin: 0 auto;
}

.auth-wrapper h1 {
  font-weight: 100;
  color: white;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(79, 98, 148);
}
.auth-wrapper .form {
  background: #0e101c;
  max-width: 400px;
  margin: 0 auto;
}

.auth-wrapper .p {
  color: #bf1650;
}

.auth-wrapper p::before {
  display: inline;
  content: "⚠ ";
}

.auth-wrapper input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
}

.auth-wrapper label {
  line-height: 2;
  text-align: left;
  display: block;
 margin: 5px 0 ;
  font-size: 14px;
  font-weight: 200;
}

.auth-wrapper button[type="submit"],
.auth-wrapper input[type="submit"] {
  background: #7A84EB;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 40px;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
}

.auth-wrapper button[type="submit"]:hover,
.auth-wrapper input[type="submit"]:hover {
  background: #636ee6;
}

.auth-wrapper button[type="submit"]:active,
.auth-wrapper input[type="button"]:active,
.auth-wrapper input[type="submit"]:active {
  transition: 0.3s all;
  transform: translateY(3px);
  border: 1px solid transparent;
  opacity: 0.8;
}

.auth-wrapper input:disabled {
  opacity: 0.4;
}

.auth-wrapper input[type="button"]:hover {
  transition: 0.3s all;
}

.auth-wrapper button[type="submit"],
.auth-wrapper input[type="button"],
.auth-wrapper input[type="submit"] {
  -webkit-appearance: none;
}

.auth-wrapper button[type="button"] {
  display: block;
  appearance: none;
  background: #333;
  color: white;
  border: none;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;
}

hr {
  margin-top: 30px;
}

.auth-wrapper button {
  display: block;
  appearance: none;
  margin-top: 40px;
  border: 1px solid #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 4px;
}


`

export default GlobalStyles
