import React from 'react'
import {Link} from "react-router-dom"

function Registerpage() {
  return (
    <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>
            <form >
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    
                />
                {/* {errors.email && <p>This email field is required</p>} */}

                <label>Name</label>
                <input
                    name="name"
                    
                />
                {/* {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>} */}

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    // ref={register({ required: true, minLength: 6 })}
                />
                {/* {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>} */}

                <label>Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    // ref={register({
                    //     required: true,
                    //     validate: (value) =>
                    //         value === password.current
                    // })}
                />
                {/* {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
                {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}

                {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>
                } */}

                <input type="submit" value="SUBMIT"/>
                <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면...  </Link>
            </form>

        </div>
  )
}

export default Registerpage
