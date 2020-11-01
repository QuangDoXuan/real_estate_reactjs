import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//toast
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import userProvider from '../../../../data-access/user-provider'

//UI
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            userName: this.props.data && this.props.data.UserName ? this.props.data.userName : '',
            password: this.props.data && this.props.data.password ? this.props.data.password : '',
            image: this.props.data && this.props.data.image ? this.props.data.image : '',
            description: this.props.data && this.props.data.description ? this.props.data.description : '',
            repeat_password: ''
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('minLength', (value) => {
            if (value.length < 8) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('maxLength', (value) => {
            if (value > 20) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch');
        ValidatorForm.removeValidationRule('minLength');
        ValidatorForm.removeValidationRule('maxLength');
    }


    handleClose = () => {
        this.props.callbackOff()
    };

    create = () => {
        let param = {
            Email: this.state.userName,
            Password: this.state.password,
            ConfirmPassword: this.state.repeat_password
        }
        axios.post("https://localhost:44334/api/Account/Register", param, { 'Content-Type': 'application/json' }).then(res => {
            if (res.status == 200 && res.data == "" && res.statusText == "") {
                toast.success("Tạo mới thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                window.location.reload()
            }
            else {
                toast.error("Tạo mới thất bại", {
                    position: toast.POSITION.TOP_RIGHT
                })
                window.location.reload()
            }
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        const { classes } = this.props
        const { userName, password, repeat_password } = this.state
        return (

            <Dialog open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                fullWidth="md"
                maxWidth="md"
            >
                <DialogContent>
                    <ValidatorForm onSubmit={this.create}>
                        {this.props.data.UserId ? <DialogTitle>Cập nhật người dùng</DialogTitle> : <DialogTitle>Thêm mới người dùng</DialogTitle>}
                        <DialogContent>

                            <Grid container spacing={16}>
                                <Grid item xs={12} md={3}>Tên người dùng(*)</Grid>
                                <Grid item xs={12} md={9}>
                                    <TextValidator
                                        value={userName}
                                        placeholder="Nhập tên người dùng"
                                        className={classes.textField}
                                        validators={["required"]}
                                        errorMessages={['Tên người dùng không được bỏ trống!']}
                                        onChange={(event) => {
                                            // this.data2.userName = event.target.value;
                                            this.setState({ userName: event.target.value });
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={3}>Mật khẩu(*)</Grid>
                                <Grid item xs={12} md={9}>
                                    <TextValidator
                                        value={password}
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        className={classes.textField}
                                        validators={["required", "minLength", "maxLength"]}
                                        errorMessages={['Mật khẩu không được bỏ trống!', "Mật khẩu phải dài ít nhất 8 kí tự, nhiều nhất 20 kí tự", "Mật khẩu phải dài ít nhất 8 kí tự, nhiều nhất 20 kí tự"]}
                                        onChange={(event) => {
                                            // this.data2.password = event.target.value;
                                            this.setState({ password: event.target.value });
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={3}>Nhập lại mật khẩu</Grid>
                                <Grid item xs={12} md={9}>
                                    <TextValidator
                                        value={repeat_password}
                                        placeholder="Nhập lại mật khẩu"
                                        className={classes.textField}
                                        onChange={(event) => {
                                            this.setState({ repeat_password: event.target.value })
                                        }}
                                        validators={['isPasswordMatch']}
                                        errorMessages={['Nhập lại mật khẩu không đúng']}
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={this.handleClose} variant="contained" color="inherit">Cancel</Button> */}
                            <Button variant="contained" color="primary" type="submit">Ok</Button>
                            {/* {
                                this.data != JSON.stringify(this.data2) ?
                                    <Button variant="contained" color="primary" type="submit">Ok</Button> :
                                    <Button variant="contained" color="primary" disabled>Ok</Button>
                            } */}
                        </DialogActions>
                    </ValidatorForm>

                </DialogContent>
            </Dialog>
        )
    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}


const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
    }, textField: {
        width: '100%'
    }, avatar: {
        margin: 10,
    }, bigAvatar: {
        width: 60,
        height: 60,
    }, helpBlock: {
        color: 'red',
    },
    textRight: {
        float: 'right'
    }
});
export default withStyles(styles)(connect(mapStateToProps)(ModalAddUpdate));