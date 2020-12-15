import React from 'react'

//UI
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../components/pagination/pagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

//Component
import ModalAddUpdate from './create-update-product'


//provider
import productProvider from '../../../../data-access/product-provider'
import { toast } from 'react-toastify';

//Dialog
import ConfirmDialog from '../../components/confirm';
import stringUtils from '../../../../resources/stringUtils'

import axios from 'axios';
const resource_url = "http://localhost:3001"

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 10,
      total: 0,
      progress: false,
      selected: [],
      progress: false,
      modalAddUpdate: false,
      modalDetailProduct: false,
      listProducts: [],
      dataProducts: {},
      tempDelete: {},
      confirmDialog: false
    }
  }

  componentDidMount() {
    this.loadPage()
  }

  loadPage() {
    // this.getAllProducts()
    this.getByPage();
  }

  handleChangePage = (event, action) => {
    this.setState({
      page: action,
      selected: []
    }, () => {
      this.loadPage()
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ size: event.target.value }, () => {
      this.loadPage()
    });
  };

  getByPage() {

    let param = {
      page: this.state.page,
      per: this.state.size,
      type: "0"
    }

    productProvider.getByPage(param).then(res => {
      let stt = 1 + (param.page) * param.per;
      this.setState({
        listProducts: res,
        stt,
        total: res.length,
        // totalPerPage:res.Data.TotalNumberOfRecords
      })
    }).catch(e => {
      console.log(e)
    })
  }

  closeModal() {
    this.setState({ modalAddUpdate: false, modalDetailUser: false, dataProducts: {} })
    this.loadPage();
  }

  modalAddUpdate = () => {
    this.setState({
      modalAddUpdate: true
    })
  }
  modalUpdate = (data) => {
    this.setState({
      modalAddUpdate: true,
      dataProducts: data
    })
  }

  modalDetail = (data) => {
    this.setState({
      modalDetailUser: true,
      dataProducts: data
    })
  }

  delete = (type) => {
    this.setState({ confirmDialog: false })
    if (type == 1) {
      productProvider.deleteProduct(this.state.tempDelete.id).then(res => {
        toast.success("Xóa thành công", {
          position: toast.POSITION.TOP_RIGHT
        })
        this.loadPage()
      }).catch(e=>{
        console.log(e)
      })
    }

  }

  showModalDelete(item) {
    this.setState({
      confirmDialog: true,
      tempDelete: item
    })
  }

  modalDetailImage(item) {
    // console.log("abc","abxb")
    const { images} = this.state;
    // for (let i = 0; i < item.ProductImage.length; i++) {
    //   // listImage.push(data[item].slideItems[i].image)
    //   console.log()
    // }
    console.log(item.ProductImage)
   let lstImage= item.ProductImage.split("*")
   console.log(lstImage)

    // console.log(listImage)
    // this.setState({
    //   listImage: listImage,
    //   photoIndex: 0,
    //   isOpen: true
    // })
    // console.log(listImage)
  }
  search=(e)=>{
      let name = e.target.value
        this.setState({progress:true})
        productProvider.searchByName(name).then(res=>{
          this.setState({
            listProducts: res,
            // stt,
            // total: this.state.listProducts.length,
          })
          this.setState({progress:false})
        }).catch(e=>{
          console.log(e)
        })
  }

  render() {
    const { page, size, stt, total, progress, listProducts, dataProducts } = this.state
    return (
      <div>
        <div className="head-page-admin">
          <div className="title-page-admin">
            <h5 className="title-manage-admin">Danh sách sản phẩm</h5>
          </div>
          <div className="toolbar-admin">
            <TextField
              onChange={(e)=>this.search(e)}
              id="outlined-basic"
              className="input-search"
              label="Tên sản phẩm"
              margin="normal"
              variant="outlined"
            />

            <Button onClick={this.modalAddUpdate} style={{ marginBottom: 32, float: 'right' }} color="secondary" variant="contained" className="btn-add">Thêm mới</Button>
          </div>
        </div>

        {progress ? <LinearProgress /> : null}
        <div className="table-wrapper">
          <Table className="table-data-admin" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên sản phẩm </TableCell>
                <TableCell>Giá</TableCell>
                {/* <TableCell>Loại</TableCell> */}
                <TableCell>Diện tích(m2)</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tùy chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {listProducts.length > 0 ? listProducts.map((item, index) => {
                return (<TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  {/* <TableCell>{item.price01}</TableCell> */}
                  <TableCell>{item.price01}</TableCell>
                  <TableCell >{item.area}</TableCell>

                  <TableCell><img style={{ width: 150, margin: '4px 0px' }} src={ (item.thumnail && item.thumnail.url ? resource_url + item.thumnail.url : item.remote_thumbnail)} /></TableCell>

                  <TableCell className="icon-sidebar">
                    <Tooltip title="Sửa">
                      <IconButton onClick={() => this.modalUpdate(item)} color="primary" aria-label="EditIcon">
                        <img src="/images/icon/edit.svg" alt="" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton onClick={() => this.showModalDelete(item)} color="primary" aria-label="IconRefresh">
                        <img src="/images/icon/delete.svg" alt="" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                </TableRow>)
              }) : 'Khong co du lieu'}

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Số dòng trên trang"
                  rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
                  count={total}
                  rowsPerPage={size}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* {isOpen && (
          <Lightbox
            mainSrc={listImage[photoIndex].absoluteUrl()}
            nextSrc={listImage[(photoIndex + 1) % listImage.length].absoluteUrl()}
            prevSrc={listImage[(photoIndex + listImage.length - 1) % listImage.length].absoluteUrl()}
            onCloseRequest={() => this.setState({ isOpen: false, listImage: [] })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + listImage.length - 1) % listImage.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % listImage.length,
              })
            }
          />
        )} */}

        {this.state.modalAddUpdate && <ModalAddUpdate data={dataProducts} callbackOff={this.closeModal.bind(this)} />}
        {this.state.confirmDialog && <ConfirmDialog title="Xác nhận" content={"Bạn có chắc chắn muốn xóa sản phẩm?"} btnOk="Xác nhận" btnCancel="Hủy" cbFn={this.delete.bind(this)} />}
      </div>
    )
  }
}
export default News