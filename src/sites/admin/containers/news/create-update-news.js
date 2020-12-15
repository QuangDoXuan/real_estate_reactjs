
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

import newCategoryProvider from '../../../../data-access/new-category-provider'

import clientUtils from '../../../../utils/client-utils'
import axios from 'axios';
const resource_url = "http://localhost:3001"

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
            newName: this.props.data && this.props.data.title ? this.props.data.title : '',
            description: this.props.data && this.props.data.description ? this.props.data.description : '',
            newBody: this.props.data && this.props.data.content ? this.props.data.content : '',
            thumnail: this.props.data && this.props.data.thumnail ? this.props.data.thumnail : ' ',
            isHotNew: this.props.data && this.props.data.is_hot ? this.props.data.is_hot: 0,
            isPresent: this.props.data && this.props.data.is_present ? this.props.data.is_present: 0,
            imageName: '',
            listCategory: [],
            imagePreviewUrl: '',
            imageFake:'',
            showImage: true

        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
    }

    handleImageChange = (e) => {
        this.setState({
            thumnail: e.target.files[0],
            image: e.target.files[0],
            imageName: e.target.files[0].name,
            imageFake: URL.createObjectURL(e.target.files[0]),
            showImage: false
        })
       
    };


    _handleImageChange(e) {
        e.preventDefault();
        this.setState({
            thumnail: URL.createObjectURL(e.target.files[0])
          })// Would see a path?
    }

    handleClose = () => {
        this.props.callbackOff()
    };

    create = () => {
        const { dataNew, newName, sortName, description, newBody, count, newTag, image } = this.state;
        let id = dataNew ? dataNew.id : '';
        let formData = new FormData();
        formData.append('title', this.state.newName)
        formData.append('description', this.state.description)
        formData.append('content', this.state.newBody)
        formData.append('thumnail', this.state.thumnail)
        formData.append('is_hot', this.state.isHotNew)
        formData.append('is_present', this.state.isPresent)

        if (dataNew && dataNew.id) {
            axios({
                url: "http://localhost:3001/admin/posts/" + id,
                method: 'PUT',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                toast.success("Cập nhật tin tức thành công", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose();
            })
            .catch(e => {
                toast.error("Cập nhật tin tức không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                this.handleClose()
            })
        } else {

            axios({
                url: "http://localhost:3001/admin/posts",
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
                    toast.success("Tạo mới tin tức thành công", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.handleClose();
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
                                        this.data2.title = event.target.value;
                                        this.setState({ newName: event.target.value });
                                    }}
                                />
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
                                {this.state.showImage && this.props.data && this.props.data.id?<img src={this.props.data.thumnail.url != null ? resource_url + this.props.data.thumnail.url : '' } style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                : <img src={this.state.imageFake} style={{ width: 150, marginTop: 16, border: "1px soild" }} />
                                }
                                {this.state.image && 
                                    <div className='input-image'>{this.state.image.name}</div>
                                }
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

                            <Grid item xs={12} md={3}>Nổi bật</Grid>
                            <Grid item xs={12} md={9}>
                                <SelectValidator
                                    value={this.state.isPresent}
                                    className={classes.textField}
                                    validators={["required"]}
                                    onChange={(event) => {
                                        this.data2.is_hot = event.target.value;
                                        this.setState({ isPresent: event.target.value });
                                    }}

                                >
                                    <MenuItem value={0}>Mặc định</MenuItem>
                                    <MenuItem value={1}>Nổi bật</MenuItem>
                                </SelectValidator>
                            </Grid>

                            <Grid item xs={12} md={3}>Tin hot</Grid>
                            <Grid item xs={12} md={9}>
                                <SelectValidator
                                    value={isHotNew}
                                    className={classes.textField}
                                    validators={["required"]}
                                    onChange={(event) => {
                                        this.data2.is_hot = event.target.value;
                                        this.setState({ isHotNew: event.target.value });
                                    }}

                                >
                                    <MenuItem value={0}>Mặc định</MenuItem>
                                    <MenuItem value={1}>Hot</MenuItem>
                                </SelectValidator>
                            </Grid>


                            <Grid item xs={12} md={3}>Nội dung</Grid>
                            <Grid item xs={12} md={9}>
                                <CKEditor
                                    data={newBody}
                                    editor={ClassicEditor}

                                    onChange={(event, editor) => {
                                        this.setState({ newBody: editor.getData() })
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