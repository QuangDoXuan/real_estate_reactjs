
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
//Component

//data-access
import newsProvider from '../../../../data-access/news-provider'
import imageProvider from '../../../../data-access/image-provider'
import newCategoryProvider from '../../../../data-access/new-category-provider'

import clientUtils from '../../../../utils/client-utils'
import axios from 'axios';
const resource_url = "https://localhost:44334"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const editorConfiguration = {
//     plugins: [ Essentials, Bold, Italic, Paragraph ],
//     toolbar: [ 'bold', 'italic' ]
// };
ClassicEditor
.create( document.querySelector( '#editor' ), {
    cloudServices: {
        tokenUrl: 'https://https://44400.cke-cs.com/token/dev/qb1umxws7wvNH1vbCmKc6UXy5etgSgzec10oHS4Y3LHkdZBkpAgZXIl8riuT.com/cs-token-endpoint',
        uploadUrl: 'https://44400.cke-cs.com/easyimage/upload/'
    }
} )
.then( console.log("hello"))
.catch( e=>console.log(e) );


class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dataNew: this.props.data,
            newName: this.props.data && this.props.data.NewName ? this.props.data.NewName : '',
            sortName: this.props.data && this.props.data.NewSortName ? this.props.data.NewSortName : '',
            description: this.props.data && this.props.data.NewDescription ? this.props.data.NewDescription : '',
            newBody: this.props.data && this.props.data.NewBody ? this.props.data.NewBody : '',
            count: this.props.data && this.props.data.Count ? this.props.data.Count : 1,
            isHotNew: this.props.data.IsHotNew && this.props.IsHotNew ? this.props.IsHotNew : true,
            newTag: this.props.data && this.props.data.NewTag ? this.props.data.NewTag : null,
            image: this.props.data && this.props.data.NewImage ? this.props.data.NewImage : ' ',
            imageName: '',
            newCategory: this.props.data && this.props.data.NewCategoryId ? this.props.data.NewCategoryId : '',
            listCategory: [],
            imagePreviewUrl: '',
            imageFake:''

        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
        this.getNewCategory()
    }

    getNewCategory() {
        newCategoryProvider.getAll().then(res => {
            this.setState({
                listCategory: res.Data
            })
        }).catch(e => {
            console.log(e)
        })
    }


    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0])
        })
       
    };


    _handleImageChange(e) {
        e.preventDefault();

        // Assuming only image
        // Assuming only image
        this.setState({
            image: URL.createObjectURL(e.target.files[0])
          })// Would see a path?
        // TODO: concat files // Would see a path?
        // TODO: concat files
    }


    handleClose = () => {
        this.props.callbackOff()
    };

    create = () => {
        const { dataNew, newName, sortName, description, newBody, count, newTag, image } = this.state;
        let id = dataNew ? dataNew.NewId : '';
        let formData = new FormData();
        formData.append("NewId", this.state.dataNew.NewId)
        formData.append('NewCategoryId', this.state.newCategory)
        formData.append('NewName', this.state.newName)
        formData.append('NewDescription', this.state.description)
        formData.append('NewBody', this.state.newBody)
        formData.append('Count', this.state.count)
        formData.append('IsHotNew', this.state.isHotNew)
        formData.append('NewTag', this.state.newTag)
        formData.append('image', this.state.image)

        if (dataNew && dataNew.NewId) {
            axios({
                url: "https://localhost:44334/api/News/update",
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
                })
                .catch(e => {
                    toast.error("Cập nhật tin tức không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })
        } else {

            axios({
                url: "https://localhost:44334/api/News/create",
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
                        toast.success("Tạo mới tin tức thành công", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.handleClose();
                    }
                })
                .catch(e => {
                    toast.error("Tạo mới tin tức không thành công!", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose()
                })
        }

    }



    render() {
        console.log(this.props.data.NewImage)
        const { classes } = this.props
        const { dataNew, newCategory, newName, sortName, description, newBody, image, count, isHotNew, newTag } = this.state
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
                    <DialogTitle> {this.props.data.NewId ? 'Cập nhật tin tức ' : 'Thêm mới tin tức'}</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} md={3}>Tên tin tức(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={newName}
                                    placeholder="Nhập tên tin tức"
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Tên tin tức không được bỏ trống!']}
                                    onChange={(event) => {
                                        this.data2.newName = event.target.value;
                                        this.setState({ newName: event.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Loại tin tức(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <SelectValidator
                                    value={newCategory}
                                    className={classes.textField}
                                    validators={["required"]}
                                    errorMessages={['Loại tin tức không được bỏ trống!']}
                                    onChange={(event) => {
                                        this.data2.newCategory = event.target.value;
                                        this.setState({ newCategory: event.target.value });
                                    }}

                                >
                                    {this.state.listCategory.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.NewCategoryId}>{item.NewCategoryName}</MenuItem>
                                        )

                                    })}



                                </SelectValidator>
                            </Grid>

                            <Grid item xs={12} md={3}>Hình ảnh(*)</Grid>
                            <Grid item xs={12} md={9}>
                                <input
                                    accept="image/png, image/jpeg"
                                    className={classes.input}
                                    style={{ display: 'none' }}
                                    placeholder="chọn ảnh"
                                    id="upload_logo_header"
                                    onChange={(e)=>this.handleImageChange(e)}
                                    type="file"
                                    // value={this.state.image}
                                />
                                <label htmlFor="upload_logo_header" style={{ marginLeft: '-3%' }}>
                                    <Button component="span">
                                        <img style={{ width: 30, margin: 'auto', border: "1px soild" }}
                                            src="/image-icon.png" />
                                    </Button>
                                </label>
                                {/* {this.props.data.NewImage? <img style={{width:100, height:100}} src={resource_url+this.state.image}/>:
                                    
                                } */}
                                 <img style={{width:100, height:100}} src={this.state.imageFake}/>
                                    
                                {/* <div className='input-image'>{this.state.image}</div> */}
                            </Grid>
                            <Grid item xs={12} md={3}>Mô tả</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={description}
                                    placeholder="Nhập mô tả"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.description = event.target.value;
                                        this.setState({ description: event.target.value })
                                    }}
                                    validators={['required']}
                                    errorMessages={['Mô tả không được để trống']}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Tag</Grid>
                            <Grid item xs={12} md={9}>
                                <TextValidator
                                    value={newTag}
                                    placeholder="tag"
                                    className={classes.textField}
                                    onChange={(event) => {
                                        this.data2.newTag = event.target.value;
                                        this.setState({ newTag: event.target.value })
                                    }}
                                    validators={['required']}
                                    errorMessages={['Tag không được để trống']}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>Nội dung</Grid>
                            <Grid item xs={12} md={9}>
                                <CKEditor
                                    data={newBody}
                                    editor={ClassicEditor}

                                    config={{ckfinder: {
                                        // Upload the images to the server using the CKFinder QuickUpload command.
                                        // uploadUrl: 'https://44400.cke-cs.com/easyimage/upload/'
                                        uploadUrl: 'https://localhost:44334/Uploads/'
                                      }}}

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                        this.setState({ newBody: data })
                                    }}

                                />
                            </Grid>
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