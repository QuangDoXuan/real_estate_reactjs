
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

//data-access
import imageProvider from '../../../../data-access/image-provider'
import cateProvider from '../../../../data-access/category-provider'


import axios from 'axios';
import projectProvider from '../../../../data-access/project-provider';

const resource_url = "http://localhost:3001"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataProduct: this.props.data,
            ProductId:this.props.data&&this.props.data.id?this.props.data.id:'',
            ProductCategoryId: this.props.data && this.props.data.category_id ? this.props.data.category_id : '',
            ProductName: this.props.data && this.props.data.name ? this.props.data.name : '',
            ProductSummary: this.props.data && this.props.data.description ? this.props.data.description : '',
            ProductPrice: this.props.data && this.props.data.price01 ? this.props.data.price01 : '',
            ProductArea: this.props.data && this.props.data.area ? this.props.data.area : '',
            ProductBedrooms: this.props.data && this.props.data.bed_rooms ? this.props.data.bed_rooms : '',
            ProductAddress: this.props.data && this.props.data.address ? this.props.data.address : ' ',
            OrderNo: this.props.data && this.props.data.OrderNo ? this.props.data.OrderNo : null,
            ProductPriceMeter: this.props.data && this.props.data.price01 ? this.props.data.price01 : '',
            ProductFloors: this.props.data && this.props.data.floors ? this.props.data.floors : '',
            ProductThumbnail: this.props.data && this.props.data.remote_thumbnail ? this.props.data.remote_thumbnail : ' ',
            ProductImages:this.props.data&&this.props.data.ProductImages? this.props.data.ProductImages: [],
            imageFake:'',
            listCatProd:[],
            images:[],
            projects:[],
            projectId: this.props.data&&this.props.data.project_id?this.props.data.project_id:'',
            lng:this.props.data&&this.props.data.lon? this.props.data.lon: '',
            lat:this.props.data&&this.props.data.lat? this.props.data.lat: '',
            thumnail: this.props.data&&this.props.data.thumnail&&this.props.data.thumnail?this.props.data.thumnail:''
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
        this.getAllProductCategory()
        this.getAllProjects()
    }

    handleImageChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            ProductThumbnail: e.target.files[0],
            thumnail: e.target.files[0],
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

    getAllProductCategory(){
        cateProvider.getAll().then(res=>{
            console.log(res)
            this.setState({
                listCatProd:res
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    getAllProjects(){
        projectProvider.getAll().then(res=>{
            console.log(res)
            this.setState({
                projects: res
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    handleClose = () => {
        this.props.callbackOff()
    };

    create = () => {
        const { dataProduct } = this.state;
        let formData = new FormData();
        formData.append('category_id', this.state.ProductCategoryId)
        formData.append('name', this.state.ProductName)
        formData.append('description', this.state.ProductSummary)
        formData.append('price01', this.state.ProductPrice)
        formData.append('area', this.state.ProductArea)
        formData.append('bed_rooms', this.state.ProductBedrooms)
        formData.append('address', this.state.ProductAddress)
        formData.append('thumnail', this.state.thumnail)
        formData.append('project_id', this.state.projectId)
        formData.append('floors', this.state.ProductFloors)
        formData.append('lon', this.state.lng)
        formData.append('lat', this.state.lat)
        for (const file of this.state.images) {
            formData.append('product_images[]', file, file.name);
        }

        if (dataProduct && dataProduct.id) {
            axios({
                url: "http://localhost:3001/admin/products/" + dataProduct.id,
                method: 'PUT',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // 'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
                }
            })
            .then(res => {
                toast.success("Cập nhật sản phẩm thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })
            .catch(e => {
                toast.error("Cập nhật sản phẩm không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })
        } else {

            axios({
                url: "http://localhost:3001/admin/products",
                method: 'POST',
                data: formData,
                headers: {
                    //Accept: 'application/json',
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res)
                    toast.success("Tạo mới sản phẩm thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
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
                    <DialogTitle className={classes.titleDialog}> {this.props.data.id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}</DialogTitle>
                    <DialogContent>
                        <Grid container>

                        {/* <Grid item xs={12} md={2}>Mã sản phẩm(*)</Grid> */}
                            {/* <Grid item xs={12} md={4} className={classes.pdr40}>
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
                            </Grid> */}

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
                                {this.props.data && this.props.data.id?<img src={resource_url + this.state.thumnail.url} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
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
                                    {listCatProd.length > 0 && listCatProd.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        )
                                            
                                    })}
                                   
                                    
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2}>Dự án </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className={classes.textField}
                                    value={this.state.projectId}
                                    onChange={(e)=>{
                                        this.data2.projecId = e.target.value;
                                        this.setState({projectId:e.target.value})
                                    }}
                                >
                                    {this.state.projects.length > 0 && this.state.projects.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        )
                                            
                                    })}
                                   
                                    
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2}>Giá</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <TextValidator
                                    value={ProductPrice}
                                    type='text'
                                    className={classes.textField}
                                    onChange={(event) => {
                                        // this.data2.ProductPrice = event.target.value;
                                        this.setState({ ProductPrice: event.target.value })
                                    }}
                                    validators={['required']}
                                    errorMessages={['Gía sản phẩm không được để trống']}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>Mô tả</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                {/* <TextField
                                    value={ProductSummary}
                                    multiline
                                    placeholder="Nhập mô tả"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.ProductSummary = event.target.value;
                                        this.setState({ ProductSummary: event.target.value })}
                                    }
                                /> */}
                                <CKEditor
                                    data={ProductSummary}
                                    editor={ClassicEditor}

                                    config={{ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        // uploadUrl: 'https://44400.cke-cs.com/easyimage/upload/'
                                        uploadUrl: 'https://localhost:44334/Uploads/'
                                      }}}

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                        this.data2.ProductSummary = data;
                                        this.setState({ ProductSummary: data })
                                    }}

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
                                <input value={ProductArea} type="text" onChange={(event) => {
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

                            {/* <Grid item xs={12} md={2}>Số phòng tắm </Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input  
                                value={ProductBathrooms} 
                                type="number" 
                                onChange={(event) => {
                                    this.data2.ProductBathrooms = event.target.value;
                                    this.setState({ ProductBathrooms: event.target.value })} }
                                placeholder="Số phòng tắm" 
                                className={classes.textFieldOwn} />
                            </Grid> */}

                            <Grid item xs={12} md={2}>lng</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input value={this.state.lng} type="number" onChange={(event) => this.setState({ lng: event.target.value })} className={classes.textFieldOwn} />
                            </Grid>

                            <Grid item xs={12} md={2}>lat</Grid>
                            <Grid item xs={12} md={4} className={classes.pdr40}>
                                <input 
                                value={this.state.lat}
                                 type="text" 
                                 onChange={(event) => {
                                    this.data2.lat = event.target.value;
                                     this.setState({ lat: event.target.value })}}
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