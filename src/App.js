import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import CountryRenderer from './Renderer/CountryRenderer';
import GenderRenderer from './Renderer/GenderRenderer';
import DateRenderer from './Renderer/DateRenderer';
import DeleteRenderer from './Renderer/DeleteRenderer';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      columnDefs: [
        { headerName: "ID", field: "id", checkboxSelection: true, sortable: true, filter: true, editable: true },
        { headerName: "Name", field: "name", sortable: true, filter: true, editable: true },
        { headerName: "Email", field: "email", sortable: true, filter: true, editable: true },
        { headerName: "Gender", field: "Gender", cellRenderer: 'genderRenderer', cellRendererParams: { onGenderChange: this.onGenderChange }, sortable: true, filter: true, editable: true },
        { headerName: "DOB", field: "date", editable: true, cellRenderer: 'dateRenderer', cellRendererParams: { onDateChange: this.onDateChange } },
        { headerName: "Country", field: "country", cellRenderer: 'countryRenderer', cellRendererParams: { onCountryChange: this.onCountryChange }, sortable: true, filter: true, editable: true },
        { headerName: "City", field: "city", sortable: true, filter: true, editable: true },
        { headerName: " ", field: "Delete", cellRenderer: 'deleteRenderer' }
      ],
      displayColumnDefs: [
        { headerName: "Id", field: "Id", sortable: true, filter: true, resizable: true },
        { headerName: "Name", field: "Name", sortable: true, filter: true, resizable: true },
        { headerName: "Email", field: "Email", sortable: true, filter: true, resizable: true },
        { headerName: "Gender", field: "Gender", cellRenderer: 'genderRenderer', cellRendererParams: { onGenderChange: this.onGenderChange }, sortable: true, filter: true, resizable: true },
        { headerName: "DOB", field: "DOB", cellRenderer: 'dateRenderer', cellRendererParams: { onDateChange: this.onDateChange }, sortable: true, filter: true, resizable: true },
        { headerName: "Country", field: "Country", cellRenderer: 'countryRenderer', cellRendererParams: { onCountryChange: this.onCountryChange }, sortable: true, filter: true, resizable: true },
        { headerName: "City", field: "City", cellRenderer: 'cityRenderer', cellRendererParams: { onCityChange: this.onCityChange }, sortable: true, filter: true, resizable: true },
      ],
      rowData: [
        { id: "", name: "", email: "", Gender: "", date: "", country: "", city: "" }],

      suppressAggFuncInHeader: true,

      frameworkComponents: {
        genderRenderer: GenderRenderer,
        countryRenderer: CountryRenderer,
        dateRenderer: DateRenderer,
        deleteRenderer: DeleteRenderer
      }
    }
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange = () => {
    this.setState(() => ({ DOB: this.state.rowData.push() }));//it sets the new date by push method and setstate method
    console.log("Gender Change")
  }

  onGenderChange = (gender) => {
    console.log("Gender Change", gender)
  }
  onCountryChange = (country) => {
    console.log("Country Change", country)
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  deleteSelectedRows = () => {
    const selectedData = this.gridApi.getSelectedRows()
    this.gridApi.applyTransaction({ remove: selectedData })
  };

  deleteNonSelectedRows = () => {
    let row_data = [];
    this.gridApi.forEachNode(node => row_data.push(node.data));

    const selectedData = this.gridApi.getSelectedRows()
    if (selectedData.length !== 0) {
      selectedData.map(item => {
        row_data.map((obj, index) => {
          if (item.Name === obj.Name) {
            row_data.splice(index, 1);
            console.log('row_data', row_data);
          }
          return 0;
        });
        return 0;
      });
    }
    this.gridApi.applyTransaction({ remove: row_data })
  }

  showData = () => {
    let row_data = [];
    this.gridApi.forEachNode((node) => row_data.push(node.data));//by using for each node method we are pushing data to empty array
    localStorage.setItem("data", JSON.stringify(row_data));
    alert("Data submitted");
  };

  componentDidMount() {
    const json = localStorage.getItem("data");
    const items = JSON.parse(json);
    console.log();
    if (items.length !== 0) {
      this.setState({
        ...this.state,
        rowData: items
      });
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    const json = JSON.stringify(this.state.rowData)
    localStorage.setItem('data', json)
  }

  render() {
    return (
      <div>
        <div className="ag-theme-alpine" style={{ height: '250px' }}>
          <button onClick={() => this.gridApi.applyTransaction({ add: [{}] })}>Add Row</button>
          <button onClick={this.deleteSelectedRows}>Delete Selected Rows</button>
          <button onClick={this.deleteNonSelectedRows}>Delete Non Selected Rows</button>
          <button onClick={this.showData}>Submit Data</button>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            onGridReady={params => this.gridApi = params.api}
            rowSelection='multiple'
          />
        </div>
        <br />
        <br />
        <br />
        <h3 >Submitted Data</h3>
        <br />
        <div className="ag-theme-alpine" style={{ height: 250 }}>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
          />
        </div>
      </div>
    );
  }
}

export default App;