//React, redux
import React from 'react'
import { connect } from 'react-redux';

//UI
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import constants from '../../../../resources/strings'

//provider
import dataCacheProvider from '../../../../data-access/datacache-provider'
import userProvider from '../../../../data-access/user-provider'

import './main.css'
import './util.css' 
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            grant_type: 'password'
            // confirm: ''
        }
    }

    componentWillMount() {
        this.checkUserLogin()
    }

    checkUserLogin() {
        if (this.props.userApp.currentUser) {
            this.props.history.push("/admin/dashboard");
        } else {
            this.props.history.push("/dang-nhap");
        }
    }

    login() {
        const { username, password, grant_type } = this.state;
        let body = {
          email: username,
          password: password
        }
        userProvider.login(body).then(res=>{
          this.props.dispatch({ type: constants.action.action_user_login, value: res.user })
          this.props.dispatch({ type: 'SAVE_TOKEN', value: res.token })
          dataCacheProvider.save("", constants.key.storage.current_account, res.user).then(s => {
              this.props.history.push("/admin/dashboard");
          });
          toast.success('Xin chào '+ res.user.username, {
              position: toast.POSITION.TOP_RIGHT
          });
        }).catch(e=>{
          console.log(e)
        })
    }


    render() {
        const { username, password, confirm } = this.state;
        return (
          <div class="limiter">
            <div class="container-login100">
              <div class="wrap-login100 p-t-50 p-b-90">
                <div class="login100-form validate-form flex-sb flex-w">
                  <span class="login100-form-title p-b-51">
                    Login
                  </span>

                  
                  <div class="wrap-input100 validate-input m-b-16" data-validate = "Username is required">
                    <input value = {username} onChange={(event)=>this.setState({username: event.target.value})} class="input100" type="text" name="username" placeholder="Username"/>
                    <span class="focus-input100"></span>
                  </div>
                  
                  
                  <div class="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                    <input value={password} onChange={(event)=>this.setState({password: event.target.value})} class="input100" type="password" name="pass" placeholder="Password"/>
                    <span class="focus-input100"></span>
                  </div>
                  
                  <div class="flex-sb-m w-full p-t-3 p-b-24">
                    <div class="contact100-form-checkbox">
                      <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                      <label class="label-checkbox100" for="ckb1">
                        Remember me
                      </label>
                    </div>

                    <div>
                      <a href="#" class="txt1">
                        Forgot?
                      </a>
                    </div>
                  </div>

                  <div class="container-login100-form-btn m-t-17">
                    <button onClick={()=>this.login()} class="login100-form-btn">
                      Login
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(Login);