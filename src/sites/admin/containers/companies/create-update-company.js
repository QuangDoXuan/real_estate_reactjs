
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
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
//Component
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//data-access
import axios from 'axios';
import companyProvider from '../../../../data-access/company-provider'

const resource_url ="http://localhost:3001"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataCompany: this.props.data,
            companyId:this.props.data && this.props.data.id ? this.props.data.id : '',
            companyName: this.props.data && this.props.data.name ? this.props.data.name : '',
            companyImage: this.props.data&&this.props.data.image? this.props.data.image:'',
            companyThumbnail: this.props.data&&this.props.data.thumnail? this.props.data.thumnail:'',
            phone: this.props.data && this.props.data.phone ? this.props.data.phone : '',
            description: this.props.data && this.props.data.description ? this.props.data.description : '',
            address: this.props.data && this.props.data.address ? this.props.data.address : '',
            isActive: this.props.data && this.props.data.IsActive ? this.props.data.IsActive : false,
            imageFake:'',
            images:[]
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {

    }

    handleClose = () => {
        this.props.callbackOff()
    };

    handleInActive = () => {
        this.setState({
            isActive: false
        })
    }
    handleActive=()=>{
        this.setState({
            isActive:true
        })
    }
    handleImageChange = (e) => {
        this.setState({
            companyImage: e.target.files[0],
            companyThumbnail: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0])
        })
    };
    

    create = () => {
        let formData = new FormData();
        formData.append('name', this.state.companyName)
        formData.append('thumnail',this.state.companyImage)
        formData.append('phone',this.state.phone)
        formData.append('address',this.state.address)
        formData.append('description',this.state.description)

        if (this.props.data.id) {
            axios({
                url: "http://localhost:3001/admin/companies" + this.props.data.id,
                method: 'PUT',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Cập nhật thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose();
            })
            .catch(e => {
                toast.error("Cập nhật không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })
        }
        else {
            axios({
                url: "http://localhost:3001/admin/companies",
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Tạo mới công ty thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose();

            })
            .catch(e => {
                toast.error("Tạo mới công ty không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })

        }
    }

    render() {
        const { description, phone, companyName, companyImage, isActive} = this.state
        const { classes } = this.props
        return (

            <Dialog open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                fullWidth="md"
                maxWidth="md"
            >
                <ValidatorForm onSubmit={this.create}>
                    {/* <DialogTitle>{content}</DialogTitle> */}
                    <DialogTitle> {this.props.data && this.props.data.id ? 'Cập nhật công ty ' : 'Thêm mới công ty'}</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} md={3}>Tên công ty(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={companyName}
                                    placeholder="Nhập tên công ty"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên công ty không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ companyName: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Số điện thoại(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={phone}
                                    placeholder="Nhập số điện thoại"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Số điện thoại không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ phone: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Mô tả</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <CKEditor
                                    data={description}
                                    editor={ClassicEditor}

                                    config={{ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        // uploadUrl: 'https://44400.cke-cs.com/easyimage/upload/'
                                        uploadUrl: 'http://localhost:3000/uploads/'
                                    }}}

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                        this.data2.description = data;
                                        this.setState({ description: data })
                                    }}

                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Thumbnail(*)</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <input
                                    accept="image/png, image/jpeg"
                                    className={classes.input}
                                    style={{ display: 'none' }}
                                    placeholder="chọn ảnh"
                                    id="upload_logo_header"
                                    onChange={(e)=>this.handleImageChange(e)}
                                    type="file"
                                />
                                <label htmlFor="upload_logo_header" style={{ marginLeft: '-3%' }}>
                                    <Button component="span">
                                        <img style={{ width: 30, margin: 'auto', border: "1px soild" }}
                                            src="/image-icon.png" />
                                    </Button>
                                </label>
                                {this.props.data && this.props.data.id?<img src={this.state.thumnail && this.state.thumnail.url ? this.state.thumnail.url : this.state.companyImage } style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                : <img src={this.state.imageFake} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                            }
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                    {this.props.data && this.props.data.id ?
                                <div>
                                    {isActive ? <Button onClick={this.handleInActive} className={classes.btnActive} color="primary">Inactive</Button> : <Button onClick={this.handleActive} className={classes.btnActive} color="secondary">Active</Button>

                                    }
                                </div> : ""
                            }
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
        // position: 'absolute',
        // bottom: 6,
        // right: 180
    },
    pdr40:{
        paddingRight:40
    }
});
export default withStyles(styles)(connect(mapStateToProps)(ModalAddUpdate));