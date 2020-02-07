import React, { Component } from 'react';
import Loader from './Loader/Loader'
import Table from './Table/Table'
import _ from 'lodash'
import DetailRowView from './DetailRowView/DetailRowView'

export default class App extends Component {

  state = {
    isLoading: true,
    data: [],
    sorting: 'asc',
    sortField: 'id',
    row: null
  }

  async componentDidMount(){
    const response = await fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
    const data = await response.json();

    this.setState ({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sortDirection = this.state.sort === 'asc' ? 'desc' : 'asc'

    const sortedData = _.orderBy(clonedData, sortField, sortDirection)

    this.setState({
      data: sortedData,
      sort: sortDirection,
      sortField
    })
  }

  onRowSelect = row => {
    this.setState({row})
  }

  render(){
    //const {isLoading, data} = this.state;
      return(
        <div className="App">
        <div className="container">
          { 
            this.state.isLoading 
            ? <Loader />
            : <Table 
              data = {this.state.data}
              onSort = {this.onSort}
              sort = {this.state.sort}
              sortField = {this.state.sortField}
              onRowSelect = {this.onRowSelect}
              />
          }

          {
            this.state.row
              ? <DetailRowView person = {this.state.row} />
              : null
          }
        </div>
        </div>
      );
    }
  
}