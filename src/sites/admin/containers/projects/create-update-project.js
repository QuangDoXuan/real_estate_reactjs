
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
import Select from '@material-ui/core/Select';
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
            dataProject: this.props.data,
            projectId:this.props.data && this.props.data.id ? this.props.data.id : '',
            projectName: this.props.data && this.props.data.name ? this.props.data.name : '',
            projectImage: this.props.data&&this.props.data.image? this.props.data.image:'',
            projectThumbnail: this.props.data&&this.props.data.thumnail? this.props.data.thumnail:'',
            phone: this.props.data && this.props.data.phone ? this.props.data.phone : '',
            description: this.props.data && this.props.data.description ? this.props.data.description : '',
            address: this.props.data && this.props.data.address ? this.props.data.address : '',
            status: this.props.data && this.props.data.status ? this.props.data.status : '',
            totalArea: this.props.data && this.props.data.total_area ? this.props.data.total_area : '',
            lon: this.props.data && this.props.data.lon ? this.props.data.lon : '',
            lat: this.props.data && this.props.data.lat ? this.props.data.lat : '',
            company_id: this.props.data && this.props.data.company_id ? this.props.data.company_id : '',
            images:[],
            isActive: this.props.data && this.props.data.IsActive ? this.props.data.IsActive : false,
            imageFake:'',
            listCompanies:[],
            images:[]
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
        this.getAllCompany()
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
            projectImage: e.target.files[0],
            projectThumbnail: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0])
        })
    };

    onChangeHandler= event =>{
        // console.log(event.target.files)
        this.setState({
            images: event.target.files,
        })
    }
    
    getAllCompany(){
        let body = {
            page: 1,
            per: 9999
        }
        companyProvider.getByPage(body).then(res=>{
            console.log(res)
            this.setState({
                listCompanies: res
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    create = () => {
        let formData = new FormData();
        formData.append('name', this.state.projectName)
        formData.append('thumnail',this.state.projectThumbnail)
        formData.append('status',this.state.status)
        formData.append('total_area',this.state.totalArea)
        formData.append('address',this.state.address)
        formData.append('description',this.state.description)
        formData.append('company_id',this.state.company_id)
        formData.append('lon', this.state.lon)
        formData.append('lat', this.state.lat)
        for (const file of this.state.images) {
            formData.append('project_images[]', file, file.name);
        }

        if (this.props.data.id) {
            axios({
                url: "http://localhost:3001/admin/projects/" + this.props.data.id,
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
                url: "http://localhost:3001/admin/projects",
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
                toast.success("Tạo mới dự án thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose();

            })
            .catch(e => {
                toast.error("Tạo mới dự án không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })

        }
    }

    render() {
        const { description, address, status,totalArea, projectImage, projectName, projectThumbnail, isActive} = this.state
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
                            <Grid item xs={12} md={3}>Tên dự án(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={projectName}
                                    placeholder="Nhập tên dự án"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên dự án không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ projectName: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Địa chỉ</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={address}
                                    placeholder="Nhập địa chỉ"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Địa chỉ không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ address: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Diện tích</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={totalArea}
                                    placeholder="Nhập diện tích"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Diện tích không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ totalArea: event.target.value });
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
                                {this.props.data && this.props.data.id?<img src={this.state.thumnail && this.state.thumnail.url ? this.state.thumnail.url : this.state.projectImage } style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                : <img src={this.state.imageFake} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                            }
                            </Grid>
                            
                            <Grid item xs={12} md={3}>Trạng thái</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={status}
                                    placeholder="Nhập trạng thái"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        // this.data2.companyName = event.target.value;
                                        this.setState({ status: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Công ty</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className={classes.textField}
                                    value={this.state.company_id}
                                    onChange={(e)=>{
                                        this.data2.company_id = e.target.value;
                                        this.setState({company_id: e.target.value})
                                    }}
                                >
                                    {this.state.listCompanies.length > 0 && this.state.listCompanies.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        )
                                            
                                    })}
                                   
                                    
                                </Select>
                            </Grid>
                            
                            <Grid item xs={12} md={3}>lng</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <input value={this.state.lon} type="text" onChange={(event) => this.setState({ lon: event.target.value })} className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={3}>lat</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <input 
                                value={this.state.lat}
                                 type="text" 
                                 onChange={(event) => {
                                    this.data2.lat = event.target.value;
                                     this.setState({ lat: event.target.value })}}
                                  className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={3}>Hình ảnh</Grid>
                            <Grid item xs={12} md={9} className={classes.pdr40}>
                                <input
                                    accept="image/png, image/jpeg"
                                    onChange={this.onChangeHandler}
                                    type="file"
                                     multiple
                                />
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