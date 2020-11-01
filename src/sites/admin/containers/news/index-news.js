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
import ModalAddUpdate from './create-update-news'


//provider
import newsProvider from '../../../../data-access/news-provider'
import { toast } from 'react-toastify';

//Dialog
import ConfirmDialog from '../../components/confirm';
import stringUtils from '../../../../resources/stringUtils'

import clientUtils from '../../../../utils/client-utils'

import axios from 'axios';
const resource_url ="https://localhost:44334"


class News extends React.Component {
    constructor(props){
        super(props)
        this.state={
          page: 0,
          size: 10,
          total: 0,
          progress: false,
          selected: [],
          progress: false,
          modalAddUpdate: false,
          modalDetailNews: false,
          listNews:[],
          dataNews:{},
          tempDelete:{},
          confirmDialog:false
        }
    }

    componentDidMount(){
      this.loadPage()
    }

    loadPage(){
      this.getAllNews()
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

    getAllNews(){
      this.setState({progress:true})
      newsProvider.getAll().then(res=>{
        if(res.Code&& res.Code==200){
          this.setState({
            listNews:res.Data
          })
        }
        else{
          this.setState({
            listNews:[]
          })
        }
        this.setState({progress:false})
      }).catch(e=>{
        console.log(e)
        this.setState({progress:false})
      })
    }

    getByPage(){

      let param = {
        pagesize: this.state.size,
        pagenumber: this.state.page 
      }
     
      newsProvider.getByPage(param).then(res=>{
        let stt = 1 + (param.pagenumber) * param.pagesize;
        console.log(res)
        this.setState({
          listNews:res.Data.Results,
          stt,
          total:this.state.listNews.length,
          // totalPerPage:res.Data.TotalNumberOfRecords
        })
      }).catch(e=>{
        console.log(e)
      })
    }

    closeModal() {
      this.setState({ modalAddUpdate: false, modalDetailUser: false,  dataNews:{} });
      this.loadPage()
    }

    modalAddUpdate = () => {
      this.setState({
        modalAddUpdate: true
      })
    }
    modalUpdate = (data)=>{
      this.setState({
        modalAddUpdate:true,
        dataNews:data
      })
    }
  
    modalDetail= (data)=>{
      this.setState({
        modalDetailUser:true,
        dataNews:data
      })
    }

    delete=(type)=>{
      this.setState({ confirmDialog: false })
      if(type==1){
        newsProvider.deleteNew(this.state.tempDelete.NewId).then(res=>{
          if(res.Code == 200){
            toast.success("Xóa thành công",{
              position:toast.POSITION.TOP_RIGHT
            })
            this.loadPage()
          }
          else{
            toast.error("Xóa thất bại",{
              position:toast.POSITION.TOP_RIGHT
            })
          }
        })
      }

    }

    showModalDelete(item) {
      this.setState({
          confirmDialog: true,
          tempDelete: item
      })
  }


    render(){
      const { page, size,stt, total, progress,listNews,dataNews } = this.state
        return(
            <div>
        <div className="head-page-admin">
          <div className="title-page-admin">
            <h5 className="title-manage-admin">Danh sách tin tức</h5>
          </div>
          <div className="toolbar-admin">
              <TextField
              id="outlined-basic"
              className="input-search"
              label="Tên tin tức"
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
                <TableCell>Tên tin tức </TableCell>
                <TableCell>Loại tin tức</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Tag</TableCell>

                <TableCell>Tùy chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody> 
              
              {listNews.length> 0 ? 
              listNews.map((item, index) => {
                return (
                <TableRow key={index}>
              <TableCell>{index+stt}</TableCell>
              <TableCell onClick={()=>this.modalDetail(item)}>{item.NewName}</TableCell>
                <TableCell onClick={()=>this.modalDetail(item)}>{item.NewCategoryId==1?"Bán":"Thuê"}</TableCell>
                <TableCell onClick={()=>this.modalDetail(item)}><img style={{ width: 150, margin: '4px 0px' }}src={resource_url+ item.NewImage}/></TableCell>
                <TableCell onClick={()=>this.modalDetail(item)}>{item.Enable}</TableCell>
                    <TableCell onClick={()=>this.modalDetail(item)}>{item.CreateDTime}</TableCell>
                <TableCell onClick={()=>this.modalDetail(item)}>{item.NewTag}</TableCell>

                    <TableCell className="icon-sidebar">
                      <Tooltip title="Sửa">
                        <IconButton onClick={()=>this.modalUpdate(item)} color="primary" aria-label="EditIcon">
                          <img src="/images/icon/edit.svg" alt="" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton onClick= {()=>this.showModalDelete(item)} color="primary"  aria-label="IconRefresh">
                          <img  src="/images/icon/delete.svg" alt="" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                )
              }):<TableRow>Không có dữ liệu</TableRow>}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Số dòng trên trang"
                  rowsPerPageOptions={[5,10, 15, 20, 50, 100]}
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
        {this.state.modalAddUpdate && <ModalAddUpdate data={dataNews} callbackOff={this.closeModal.bind(this)} />}
        {this.state.confirmDialog && <ConfirmDialog title="Xác nhận" content={"Bạn có chắc chắn muốn xóa tin tức?"} btnOk="Xác nhận" btnCancel="Hủy" cbFn={this.delete.bind(this)} />}
      </div>
        )
    }
}
export default News