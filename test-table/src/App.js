import React, { Component } from 'react'
import Loader from './Loader/Loader'
import Table from './Table/Table'
import DetailRowView from './DetailRowView/DetailRowView'
import ModeSelector from './ModeSelector/ModeSelector'
import SearchData from './SearchData/SearchData'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'



export default class App extends Component {

  state = {
    isLoading: true,
    isCountSelected: false, 
    data: [],
    sorting: 'asc',
    sortField: 'id',
    row: null,
    currentPage: 0,
    search: '',
    hasError: false
  }

  async fetchData(url){

    const response = await fetch(url)
    const data = await response.json();

    this.setState ({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'

    const data = _.orderBy(clonedData, sortField, sort)

    this.setState({
      data,
      sort,
      sortField
    })
  }

  modeSelectHandler = url => {
    this.setState({
      isCountSelected: true,
      isLoading: true
    })

    this.fetchData(url)
  }

  onRowSelect = row => {
    this.setState({row})
  }

  handlePageClick = ({selected}) => {
    this.setState({currentPage: selected})
  }

  searchHandler = search =>{
    this.setState({search, currentPage: 0})
  }

  getFilteredData(){
    const {data, search} = this.state

    if(!search){
      return data
    }
    return data.filter(item => {
      return Array.prototype.includes(search)
          || item['firstName'].toLowerCase().includes(search.toLowerCase())
          || item['lastName'].toLowerCase().includes(search.toLowerCase())
          || item['email'].toLowerCase().includes(search.toLowerCase())
          || item['phone'].includes(search)
    })
  }

  render(){
    const pageSize = 50

    if(!this.state.isCountSelected){
      return(
        <div className="container">
          <ModeSelector onSelect = {this.modeSelectHandler}/>
        </div>
      )
    }

    const filteredData = this.getFilteredData()

    const pageCount = Math.ceil(filteredData.length / pageSize)
    
    const dispData = _.chunk(filteredData, pageSize)
    [this.state.currentPage]
    
      return(
        <div className="App">
          <ErrorBoundary>
        <div className="container">
          { 
            this.state.isLoading 
            ? <Loader />
            : <React.Fragment>
              <SearchData onSearch = {this.searchHandler}/>
                <Table 
                  data = {dispData}
                  onSort = {this.onSort}
                  sort = {this.state.sort}
                  sortField = {this.state.sortField}
                  onRowSelect = {this.onRowSelect}
                />
            </React.Fragment>
            
          }

          {
            this.state.data.length > pageSize
              ?<ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName = "page-item"
              pageLinkClassName = "page-link"
              previousClassName = "page-item"
              previousLinkClassName = "page-link"
              nextClassName = "page-item"
              nextLinkClassName = "page-link"
              forcePage = {this.state.currentPage}
            />
            : null
          }

          {
            this.state.row
              ? <DetailRowView person = {this.state.row} />
              : null
          }
        </div>
            
            </ErrorBoundary>
        </div>
      );
    }
  
}