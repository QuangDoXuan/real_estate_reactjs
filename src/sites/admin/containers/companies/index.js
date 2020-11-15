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
import ModalAddUpdate from './create-update-company'
import ConfirmDialog from '../../components/confirm';

//toast
import { ToastContainer, toast } from 'react-toastify';

import moment from 'moment'
import companyProvider from '../../../../data-access/company-provider';
class Company extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 20,
      total: 0,
      progress: false,
      selected: [],
      progress: false,
      modalAddUpdate: false,
      listCompanies: [],
      dataCompany: {},
      tempDelete:[],
      confirmDialog:false,
      name:''
    }
  }

  componentDidMount() {
   this.loadPage()
  }

  loadPage() {
    // this.getAllNewCategory()
    this.getByPage()
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

  getAllNewCategory() {
    let param = {
      per: this.state.size,
      page: this.state.page 
    }
    this.setState({progress:true})
    companyProvider.getAll(param).then(res=>{
      this.setState({
          listCompanies:res,
          progress:false
      })
    }).catch(e=>{
      console.log(e)
      this.setState({progress:false})
    })
  }



  getByPage(){
    let param = {
      per: this.state.size,
      page: this.state.page 
    }
   
    companyProvider.getByPage(param).then(res=>{
      let stt = 1 + (param.page) * param.per;
      console.log(res)
      this.setState({
        listCompanies:res,
        stt,
        total:res.length,
        // totalPerPage:res.Data.TotalNumberOfRecords
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  closeModal() {
    this.loadPage();
    this.setState({ modalAddUpdate: false, modalDetailUser: false, dataCompany:{} });
  }

  modalAddUpdate = () => {
    this.setState({
      modalAddUpdate: true,
    })
  }
  modalUpdate = (data) => {
    
    this.setState({
      modalAddUpdate: true,
      dataCompany: data
    })
  }

  modalDetail = (data) => {
    this.setState({
      modalDetailUser: true,
      dataCompany: data
    })
  }

  delete = (type)=>{
    this.setState({ confirmDialog: false })
    if(type==1){
      companyProvider.delete(this.state.tempDelete.id).then(res=>{
        toast.success("Xóa thành công",{
            position:toast.POSITION.TOP_RIGHT
        })
        this.loadPage()
      })
    }
  }

  searchByName(e){
    if(e.target.value===''){
      this.loadPage()
    }
    else{
      this.setState({progress:true})
      companyProvider.searchByName(e.target.value).then(res=>{
        if(res.Code==200){
          this.setState({
            listCompanies:res.Data
          })
        }
        this.setState({progress:false})
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

  render() {
    const { page, size, total, progress, listCompanies, dataCompany,stt,confirmDialog } = this.state
    return (
      <div>
        <div className="head-page-admin">
          <div className="title-page-admin">
            <h5 className="title-manage-admin">Quản lý công ty</h5>
          </div>
          <div className="toolbar-admin">
            <TextField
              id="outlined-basic"
              className="input-search"
              label="Tên loại sản phẩm"
              margin="normal"
              variant="outlined"
              onChange={(e)=>this.searchByName(e)}
            />
            <Button onClick={this.modalAddUpdate} style={{ marginBottom: 32, float: 'right' }} color="secondary" variant="contained" className="btn-add">Thêm mới</Button>
          </div>
        </div>
        {/* <LinearProgress/> */}
        {progress ? <LinearProgress /> : null}
        <div className="table-wrapper">
          <Table className="table-data-admin" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên công ty</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Ngày tạo</TableCell>
                {/* <TableCell>Ngày cập nhật</TableCell> */}
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {listCompanies.length > 0 && listCompanies.map((item, index) => {
                return (
                  <TableRow key={index}>
              <TableCell>{index+stt}</TableCell>
              <TableCell onClick={(item) => this.modalDetail(item)}>{item.name}</TableCell>
                {/* <TableCell onClick={(item) => this.modalDetail(item)}>{item.ProductCategoryTitle}</TableCell> */}
                <TableCell onClick={(item) => this.modalDetail(item)}><img style={{width: 150, height: 150, objectFit: 'cover'}} src={item.image}/></TableCell>
                <TableCell onClick={(item) => this.modalDetail(item)}>{moment(item.created_at).format("DD-MM-YYYY")}</TableCell>
                {/* <TableCell onClick={(item) => this.modalDetail(item)}>{moment(item.UpdateDtime).format("DD-MM-YYYY")}</TableCell> */}
                    <TableCell className="icon-sidebar">
                      <Tooltip title="Sửa">
                        <IconButton onClick={()=>this.modalUpdate(item)}  color="primary" aria-label="EditIcon">
                          <img src="/images/icon/edit.svg" alt="" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton onClick= {()=>this.showModalDelete(item)} color="primary" aria-label="IconRefresh">
                          <img src="/images/icon/delete.svg" alt="" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Số dòng trên trang"
                  rowsPerPageOptions={[5,10, 20, 50, 100]}
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
        {this.state.modalAddUpdate && <ModalAddUpdate data={dataCompany} callbackOff={this.closeModal.bind(this)} />}
        {this.state.confirmDialog && <ConfirmDialog title="Xác nhận" content={"Bạn có chắc chắn muốn xóa công ty?"} btnOk="Xác nhận" btnCancel="Hủy" cbFn={this.delete.bind(this)} />}
        {/* {this.state.modalDetailUser && <ModalDetailUser data={dataNews}  callbackOff={this.closeModal.bind(this)} />} */}
      </div>
    )
  }
}
export default Company