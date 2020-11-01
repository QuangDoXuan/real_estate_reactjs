
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

const resource_url ="https://localhost:44334"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataproductCategory: this.props.data,
            productCategoryId:this.props.data && this.props.data.ProductCategoryId ? this.props.data.ProductCategoryId : '',
            productCategoryName: this.props.data && this.props.data.ProductCategoryName ? this.props.data.ProductCategoryName : '',
            productCategoryId:this.props.data &&this.props.data.ProductCategoryId?this.props.ProductCategoryId:'',
            orderNo: this.props.data && this.props.data.OrderNo ? this.props.data.OrderNo : '',
            isActive: this.props.data && this.props.data.IsActive ? this.props.data.IsActive : false,
            createdTime: this.props.data && this.props.data.CreatedTime ? this.props.data.CreatedTime : '',
            updateTime: this.props.data && this.props.data.UpdateTime ? this.props.data.UpdateTime : '',
            productCategoryTitle:this.props.data&&this.props.data.ProductCategoryTitle?this.props.data.ProductCategoryTitle:'',
            productCategoryDescription:this.props.data&&this.props.data.ProductCategoryDescription?this.props.data.ProductCategoryDescription:'',
            productCategoryKeyword:this.props.data&&this.props.data.ProductCategoryKeyword?this.props.data.ProductCategoryKeyword:'',
            parentProductCategory:this.props.data&&this.props.data.ParentProductCategoryId?this.props.data.ParentProductCategoryId:'',
            productCategoryImage: this.props.data&&this.props.data.ProductCategoryImage? this.props.data.ProductCategoryImage:'',
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
            productCategoryImage: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0])
        })
       
    };
    

    create = () => {
        // let id = dataNew ? dataNew.NewId : '';
        let formData = new FormData();
        if (this.props.data.ProductCategoryId) {
            console.log(this.props.data.ProductCategoryId)
            formData.append('ProductCategoryId', this.props.data.ProductCategoryId)
            formData.append('ProductCategoryName', this.state.productCategoryName)
            formData.append('OrderNo', this.state.orderNo)
            formData.append('IsActive',this.state.isActive)
            formData.append('ProductCategoryTitle',this.state.productCategoryTitle)
            formData.append('ProductCategoryDescription',this.state.productCategoryDescription)
            formData.append('ProductCategoryKeyword',this.state.productCategoryKeyword)
            formData.append('ParentProductCategoryId',this.state.parentProductCategory)
            formData.append('ProductCategoryImage',this.state.productCategoryImage)
            axios({
                url: "https://localhost:44334/api/ProductCategories/update",
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
                        toast.success("Cập nhật thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose();

                    }
                    else {
                        toast.error("Cập nhật loại  không thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose()
                    }
                })
                .catch(e => {
                    toast.error("Cập nhật không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })
        }
        else {
            formData.append('ProductCategoryId',this.state.productCategoryId)
            formData.append('productCategoryName', this.state.productCategoryName)
            formData.append('OrderNo', this.state.orderNo)
            formData.append('ProductCategoryTitle',this.state.productCategoryTitle)
            formData.append('ProductCategoryDescription',this.state.productCategoryDescription)
            formData.append('ProductCategoryKeyword',this.state.productCategoryKeyword)
            formData.append('ParentProductCategoryId',this.state.parentProductCategory)
            formData.append('ProductCategoryImage',this.state.productCategoryImage)
            axios({
                url: "https://localhost:44334/api/ProductCategories/create",
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
                        toast.success("Tạo mới loại sản phẩm thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose();
                    }
                    else{
                        toast.error("Tạo mới loại sản phẩm không thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose()
                    }
                })
                .catch(e => {
                    toast.error("Tạo mới loại sản phẩm không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })

        }



    }

    render() {
        const { productCategoryId,dataproductCategory, productCategoryName, orderNo, isActive, createdTime, updateTime,productCategoryKeyword,productCategoryDescription,productCategoryTitle,productCategoryImage} = this.state
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
                    <DialogTitle> {this.props.data && this.props.data.ProductCategoryId ? 'Cập nhật loại sản phẩm ' : 'Thêm mới loại sản phẩm'}</DialogTitle>
                    <DialogContent>
                        <Grid container>

                        <Grid item xs={12} md={3}>Mã loại sản phẩm(*)</Grid>
                            <Grid item xs={12} md={9}>
                                {this.props.data&&this.props.data.ProductCategoryId ?
                                <TextValidator
                                    value={this.state.dataproductCategory.ProductCategoryId}
                                    disabled
                                    className={classes.textField}
                                    // onChange={(event) => {
                                    //     // this.data2.productCategoryName = event.target.value;
                                    //     this.setState({ productCategoryId: event.target.value });
                                    // }}
                                />
                                    :<TextValidator
                                    value={productCategoryId}
                                    placeholder="Nhập mã loại sản phẩm"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Mã loại sản phẩm không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.productCategoryName = event.target.value;
                                        this.setState({ productCategoryId: event.target.value });
                                    }}
                                />}
                            </Grid>


                            <Grid item xs={12} md={3}>Tên loại sản phẩm(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={productCategoryName}
                                    placeholder="Nhập tên loại sản phẩm"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên loại sản phẩm không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.productCategoryName = event.target.value;
                                        this.setState({ productCategoryName: event.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>Tổng loại</Grid>
                            <Grid item xs={9} md={9}>
                            <SelectValidator
                                className={classes.textField}
                                value={this.state.parentProductCategory}
                                // validators={['required']}
                                // errorMessages={['Vui lòng chọn trường này']}
                                onChange={(e)=>this.setState({parentProductCategory:e.target.value})}
                            >
                                <MenuItem  value={"THUE"}>Thuê</MenuItem>
                                <MenuItem  value={"BAN"}>Bán</MenuItem>
                                <MenuItem  value={"DUAN"}>Dự án</MenuItem>
                                <MenuItem  value={1}>Tổng</MenuItem>
                            </SelectValidator>
                            </Grid>
                            <Grid item xs={12} md={3}>Title</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={productCategoryTitle}
                                    placeholder="Nhập title"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        // this.data2.productCategoryName = event.target.value;
                                        this.setState({ productCategoryTitle: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Mô tả</Grid>
                            <Grid item xs={12} md={9}>
                            <CKEditor
                                    data={productCategoryDescription}
                                    editor={ClassicEditor}

                                    config={{ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        // uploadUrl: 'https://44400.cke-cs.com/easyimage/upload/'
                                        uploadUrl: 'https://localhost:44334/Uploads/'
                                      }}}

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                        this.data2.productCategoryDescription = data;
                                        this.setState({ productCategoryDescription: data })
                                    }}

                                />
                                    
                            </Grid>

                            <Grid item xs={12} md={3}>Keyword</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={productCategoryKeyword}
                                    placeholder="Nhập keyword"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        // this.data2.productCategoryName = event.target.value;
                                        this.setState({ productCategoryKeyword: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Hình ảnh(*)</Grid>
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
                                {this.props.data&&this.props.data.ProductCategoryId?<img src={resource_url+productCategoryImage} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                : <img src={this.state.imageFake} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                            }
                                
                                <div className='input-image'>{this.state.productCategoryImage.name}</div>

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

                           
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                    {this.props.data && this.props.data.ProductCategoryId ?
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