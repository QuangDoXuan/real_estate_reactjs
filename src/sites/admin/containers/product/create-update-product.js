
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Component

//data-access
import imageProvider from '../../../../data-access/image-provider'
import cateProvider from '../../../../data-access/product-category-provider'


import axios from 'axios';

const resource_url = "https://localhost:44334"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataProduct: this.props.data,
            ProductId:this.props.data&&this.props.data.ProductId?this.props.data.ProductId:'',
            ProductCategoryId: this.props.data && this.props.data.ProductCategoryId ? this.props.data.ProductCategoryId : '',
            ProductName: this.props.data && this.props.data.ProductName ? this.props.data.ProductName : '',
            ProductSummary: this.props.data && this.props.data.ProductSummary ? this.props.data.ProductSummary : '',
            ProductPrice: this.props.data && this.props.data.ProductPrice ? this.props.data.ProductPrice : '',
            ProductArea: this.props.data && this.props.data.ProductArea ? this.props.data.ProductArea : '',
            ProductBedrooms: this.props.data && this.props.data.ProductBedrooms ? this.props.data.ProductBedrooms : '',
            ProductBathrooms: this.props.data && this.props.data.ProductBedrooms ? this.props.data.ProductBedrooms : '',
            ProductAddress: this.props.data && this.props.data.ProductAddress ? this.props.data.ProductAddress : ' ',
            OrderNo: this.props.data && this.props.data.OrderNo ? this.props.data.OrderNo : null,
            ProductPriceMeter: this.props.data && this.props.data.ProductPriceMeter ? this.props.data.ProductPriceMeter : '',
            ProductFloors: this.props.data && this.props.data.ProductFloors ? this.props.data.ProductFloors : '',
            ProductThumbnail: this.props.data && this.props.data.ProductThumbnail ? this.props.data.ProductThumbnail : ' ',
            ProductImages:this.props.data&&this.props.data.ProductImages? this.props.data.ProductImages: [],
            imageFake:'',
            listCatProd:[],
            images:[]
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
        this.getAllProductCategory()
    }

    handleImageChange = (e) => {
        this.setState({
            ProductThumbnail: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0])
        })
       
    };

    onChangeHandler=event=>{
        this.setState({
         images: event.target.files,
        })
    }

    getAllProductCategory(){
        cateProvider.getAll().then(res=>{
            console.log(res)
            if(res.Code==200){
                this.setState({
                    listCatProd:res.Data
                })
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    handleClose = () => {
        this.props.callbackOff()
    };

    postImages=()=>{
        let imageUpload =new FormData();
        imageUpload.append('ProductId',this.state.ProductId)
        // imageUpload.append('images',this.state.images)
        for(var x = 0; x<this.state.images.length; x++) {
            imageUpload.append('images', this.state.images[x])
        }

        axios({
            url: "https://localhost:44334/api/Products/images/upload",
            method: 'POST',
            data: imageUpload,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
            }
        })
            .then(res => {
                console.log(res)
                this.handleClose()
            })
            .catch(e => {
                this.handleClose()
            })
    }


    create = () => {
        const { dataProduct } = this.state;
        let formData = new FormData();
 

        formData.append('ProductId',this.state.ProductId)
        formData.append('ProductCategoryId', this.state.ProductCategoryId)
        formData.append('ProductName', this.state.ProductName)
        formData.append('ProductSummary', this.state.ProductSummary)
        formData.append('ProductPrice', this.state.ProductPrice)
        formData.append('ProductArea', this.state.ProductArea)
        formData.append('ProductBedrooms', this.state.ProductBedrooms)
        formData.append('ProductBathrooms', this.state.ProductBathrooms)
        formData.append('ProductAddress', this.state.ProductAddress)
        formData.append('OrderNo', this.state.OrderNo)
        formData.append('ProductPriceMeter', this.state.ProductPriceMeter)
        formData.append('ProductFloors', this.state.ProductFloors)
        formData.append('ProductThumbnail', this.state.ProductThumbnail)
        formData.append('IsHotProduct', true)
        // formData.append('ProductImages',this.state.ProductImages)

        if (dataProduct && dataProduct.ProductId) {
            axios({
                url: "https://localhost:44334/api/Products/update",
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
                        toast.success("Cập nhật sản phẩm thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        // this.handleClose();
                        this.postImages()
                    }
                    else{
                        toast.error("Cập nhật sản phẩm không thành công!", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose()
                    }
                })
                .catch(e => {
                    toast.error("Cập nhật sản phẩm không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })
        } else {

            axios({
                url: "https://localhost:44334/api/Products/create",
                method: 'POST',
                data: formData,
                headers: {
                    //Accept: 'application/json',
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.Code == 200) {
                        toast.success("Tạo mới sản phẩm thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        // this.handleClose()
                        this.postImages()
                    }
                })
                .catch(e => {
                    toast.error("Tạo mới sản phẩm không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })

        }

    }


  


    render() {
        const { classes } = this.props
        const { listCatProd,OrderNo,dataProduct,ProductId, ProductName, ProductThumbnail, ProductAddress, ProductArea, ProductBedrooms, ProductCategoryId, ProductFloors, ProductSummary, ProductPrice, ProductPriceMeter,ProductBathrooms } = this.state
        return (

            <Dialog open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                fullWidth="lg"
                maxWidth="lg"
            >
                <ValidatorForm onSubmit={this.create}>
                    {/* <DialogTitle>{content}</DialogTitle> */}
                    <DialogTitle className={classes.titleDialog}> {this.props.data.ProductId ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</DialogTitle>
                    <DialogContent>
                        <Grid container>

                        <Grid item xs={12} md={2}>Mã sản phẩm(*)</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextValidator
                                    value={ProductId}
                                    placeholder="Nhập mã sản phẩm"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Mã sản phẩm không được bỏ trống!']}
                                    onChange={(event) => {
                                        // this.data2.ProductId = event.target.value;
                                        this.setState({ ProductId: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Tên sản phẩm(*)</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextValidator
                                    value={ProductName}
                                    placeholder="Nhập tên sản phẩm"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên sản phẩm không được bỏ trống!']}
                                    onChange={(event) => {
                                        this.data2.ProductName = event.target.value;
                                        this.setState({ ProductName: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Thumbnail(*)</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
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
                                {this.props.data&&this.props.data.ProductId?<img src={resource_url+ProductThumbnail} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                : <img src={this.state.imageFake} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                            }
                                
                                <div className='input-image'>{this.state.ProductThumbnail.name}</div>

                            </Grid>

                            <Grid item xs={12} md={2}>Loại sản phẩm </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className={classes.textField}
                                    value={ProductCategoryId}
                                    onChange={(e)=>{
                                        this.data2.ProductCategoryId = e.target.value;
                                        this.setState({ProductCategoryId:e.target.value})
                                    }}
                                >
                                    {listCatProd.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} value={item.ProductCategoryId}>{item.ProductCategoryTitle}</MenuItem>
                                        )
                                            
                                    })}
                                   
                                    
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2}>Giá</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextValidator
                                    value={ProductPrice}
                                    type='number'
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.ProductPrice = event.target.value;
                                        this.setState({ ProductPrice: event.target.value })
                                    }}
                                    validators={['required']}
                                    errorMessages={['Gía sản phẩm không được để trống']}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Mô tả</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextField
                                    value={ProductSummary}
                                    multiline
                                    placeholder="Nhập mô tả"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.ProductSummary = event.target.value;
                                        this.setState({ ProductSummary: event.target.value })}
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Địa chỉ </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextValidator
                                    value={ProductAddress}
                                    placeholder="Nhập địa chỉ"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.ProductAddress = event.target.value;
                                        this.setState({ ProductAddress: event.target.value })
                                    }}
                                    validators={['required']}
                                    errorMessages={['Địa chỉ không được để trống']}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Diện tích </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input value={ProductArea} type="number" onChange={(event) => {
                                    this.data2.ProductArea = event.target.value;
                                    this.setState({ ProductArea: event.target.value })
                                    }} className={classes.textFieldOwn} placeholder="Nhập diện tích" />
                            </Grid>

                            <Grid item xs={12} md={2}>Số phòng ngủ </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input value={ProductBedrooms} type="number" 
                                onChange={(event) => {
                                    this.data2.ProductBedrooms = event.target.value;
                                    this.setState({ ProductBedrooms: event.target.value })} }
                                placeholder="Nhập số phòng ngủ" 
                                className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={2}>Số phòng tắm </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input  
                                value={ProductBathrooms} 
                                type="number" 
                                onChange={(event) => {
                                    this.data2.ProductBathrooms = event.target.value;
                                    this.setState({ ProductBathrooms: event.target.value })} }
                                placeholder="Số phòng tắm" 
                                className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={2}>Order No</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input value={OrderNo} type="number" onChange={(event) => this.setState({ OrderNo: event.target.value })} placeholder="Độ ưu tiên" className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={2}>Giá 1m vuông</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input 
                                value={ProductPriceMeter}
                                 type="number" 
                                 onChange={(event) => {
                                    this.data2.ProductPriceMeter = event.target.value;
                                     this.setState({ ProductPriceMeter: event.target.value })}}
                                  placeholder="Giá 1m vuông" 
                                  className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={2}>Số tầng</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                
                            <input value={ProductFloors}
                             type="number" 
                             onChange={(event) => {
                                this.data2.ProductFloors = event.target.value;
                                this.setState({ ProductFloors: event.target.value })} }
                             placeholder="Nhập số tâng" 
                             className={classes.textFieldOwn} />
    
                            </Grid>
                            {this.props.data.ProductId? '' :
                            <div>
                            <Grid item xs={12} md={2}>Hình ảnh</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input
                                    accept="image/png, image/jpeg"
                                    onChange={this.onChangeHandler}
                                    type="file"
                                     multiple
                                />
                            </Grid>
                            </div>
                            }
                            
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="inherit">Cancel</Button>
                        {
                            this.data != JSON.stringify(this.data2) ?
                                <Button variant="contained" color="primary" type="submit">Ok</Button> :
                                <Button variant="contained" color="primary" disabled>Ok</Button>
                        }
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
    textFieldOwn: {
        borderLeft: 'none!important',
        borderRight: 'none!important',
        minHeight: 32,
        ouline: 'none!important',
        boxShadow: 'none',
        borderTop: 'none',
        padding: '8px 4px',
        borderBottom: '1px solid #ccc'
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    titleDialog: {
        fontWeight: 600,
        color: "#80b5ec"
    },

    textField: {
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
    },
    pdr40:{
        paddingRight:40
    }

});
export default withStyles(styles)(connect(mapStateToProps)(ModalAddUpdate));