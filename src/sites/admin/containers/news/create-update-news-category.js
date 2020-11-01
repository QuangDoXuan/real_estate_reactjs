
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
//UI
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
//Component

//data-access
import newsProvider from '../../../../data-access/news-provider'
import imageProvider from '../../../../data-access/image-provider'
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataNewCategory: this.props.data,
            newCategoryName: this.props.data && this.props.data.NewCategoryName ? this.props.data.NewCategoryName : '',
            newCategoryId:this.props.data &&this.props.data.NewCategoryId?this.props.newCategoryId:'',
            orderNo: this.props.data && this.props.data.OrderNo ? this.props.data.OrderNo : '',
            isActive: this.props.data && this.props.data.IsActive ? this.props.data.IsActive : '',
            createdTime: this.props.data && this.props.data.CreatedTime ? this.props.data.CreatedTime : '',
            updateTime: this.props.data && this.props.data.UpdateTime ? this.props.data.UpdateTime : '',
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {

    }

    handleClose = () => {
        this.props.callbackOff()
    };

    handleActive = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    

    create = () => {
        const { orderNo, newCategoryName, newCategoryId,isActive } = this.state;
        console.log(this.state)
        // let id = dataNew ? dataNew.NewId : '';
        let formData = new FormData();
        if (this.props.data.NewCategoryId) {
            formData.append('NewCategoryId', this.state.dataNewCategory.NewCategoryId)
            formData.append('NewCategoryName', newCategoryName)
            formData.append('OrderNo', orderNo)
            formData.append('IsActive',isActive)

            axios({
                url: "https://localhost:44334/api/NewCategory/update",
                method: 'PUT',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.Code == 200) {
                        toast.success("Cập nhật tin tức thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose();

                    }
                    else {
                        toast.error("Cập nhật tin tức không thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose()
                    }
                })
                .catch(e => {
                    toast.error("Cập nhật tin tức không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })
        }
        else {

            formData.append('NewCategoryName', this.state.newCategoryName)
            formData.append('OrderNo', this.state.orderNo)
            console.log(JSON.stringify(formData))
            axios({
                url: "https://localhost:44334/api/NewCategory/create",
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.Code == 200) {
                        toast.success("Tạo mới loại tin tức thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose();
                    }
                })
                .catch(e => {
                    toast.error("Tạo mới loại tin tức không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })

        }



    }

    render() {
        const { dataNewCategory, newCategoryName, orderNo, isActive, createdTime, updateTime } = this.state
        const { classes } = this.props
        console.log("active",this.state.isActive)
        return (

            <Dialog open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                fullWidth="sm"
                maxWidth="sm"
            >
                <ValidatorForm onSubmit={this.create}>
                    {/* <DialogTitle>{content}</DialogTitle> */}
                    <DialogTitle> {this.props.data && this.props.data.NewCategoryId ? 'Cập nhật loại tin tức ' : 'Thêm mới loại tin tức'}</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} md={3}>Tên loại tin tức(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={newCategoryName}
                                    placeholder="Nhập tên loại tin tức"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên loại tin tức không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.NewCategoryName = event.target.value;
                                        this.setState({ newCategoryName: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Thứ tự</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={orderNo}
                                    type="number"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        // this.data2.orderNo = event.target.value;
                                        this.setState({ orderNo: event.target.value })
                                    }}
                                />
                            </Grid>
                            {this.props.data && this.props.data.NewCategoryId ?
                                <div>
                                    {isActive ? <Button onClick={this.handleActive} className={classes.btnActive} color="primary">Inactive</Button> : <Button onClick={this.handleActive} className={classes.btnActive} color="secondary">Active</Button>

                                    }
                                </div> : ""
                            }
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="inherit">Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Ok</Button>
                        {/* {
                            this.data != JSON.stringify(this.data2) ?
                                <Button variant="contained" color="primary" type="submit">Ok</Button> :
                                <Button variant="contained" color="primary" disabled>Ok</Button>
                        } */}
                    </DialogActions>
                </ValidatorForm>
            </Dialog >
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
    , btnActive: {
        position: 'absolute',
        bottom: 6,
        right: 180
    }
});
export default withStyles(styles)(connect(mapStateToProps)(ModalAddUpdate));