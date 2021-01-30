import { AgGridReact } from 'ag-grid-react';
import React, { Component } from 'react';
import { AllCommunityModules } from 'ag-grid-react';
//import DatePicker from "react-datepicker";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import ColorsRenderer from './Renderer/ColorsRenderer'
import CountryRenderer from './Renderer/CountryRenderer';
import GenderRenderer from './Renderer/GenderRenderer';
import DateRenderer from './Renderer/DateRenderer';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      columnDefs: [
        { headerName: "ID", field: "id", checkboxSelection: true, sortable: true, filter: true, editable: true },
        { headerName: "Name", field: "name", sortable: true, filter: true, editable: true },
        { headerName: "Email", field: "email", sortable: true, filter: true, editable: true },
        { headerName: "Gender", field: "Gender", cellRenderer: 'genderRenderer', cellRendererParams: { onGenderChange: this.onGenderChange }, sortable: true, filter: true, editable: true },
        {
          headerName: "DOB", field: "date", editable: true,cellRenderer:'dateRenderer', cellRendererParams: { onDateChange: this.onDateChange}
        },
        { headerName: "Country", field: "country", cellRenderer: 'countryRenderer', cellRendererParams: { onCountryChange: this.onCountryChange }, sortable: true, filter: true, editable: true },
        { headerName: "City", field: "city", sortable: true, filter: true, editable: true }
      ],
      rowData: [
        { id: 1, name: "Mayur", email: "Mayur@gmail.com", Gender: "Male", date: "10-04-98", country: "India", city: "Mumbai" },
        { id: 2, name: "Mayuri", email: "mayuri@gmail.com", Gender: "Female", date: "10-04-98", country: "India", city: "Mumbai" },
        { id: 3, name: "Mayura", email: "mayur@agmail.com", Gender: "Male", date: "10-04-98", country: "India", city: "Mumbai" }],
      frameworkComponents: {
        genderRenderer: GenderRenderer,
        countryRenderer: CountryRenderer,
        dateRenderer: DateRenderer
      }
    }
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange = (date) => {
    console.log("Date Change", date)
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

  onAddRow = () => {
    this.gridApi.updateRowData({
      add: [{ id: '', name: '', email: '', Gender: '', dob: '', country: '', city: '' }]
    })
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
                if(item.Name === obj.Name) {
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
    //localStorage.setItem('dataKey', JSON.stringify(this.state.rowData  ));
    localStorage.setItem('data',JSON.stringify(this.state.rowData))
        var c=JSON.parse(localStorage.getItem('data'));
        console.log(c);

};  
componentDidMount() {
  JSON.parse(localStorage.getItem('dataKey'));

};


  render() {
    return (
      <div className="ag-theme-alpine" style={{ height: '200px' }}>
        <button onClick={() => this.gridApi.applyTransaction({ add: [{}] })}>Add Row</button>
        <button onClick={this.deleteSelectedRows}>Delete Selected Rows</button>
        <button onClick={this.deleteNonSelectedRows}>Delete Non Selected Rows</button>
        <button onClick={this.showData}>Submit Data</button>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          frameworkComponents={this.state.frameworkComponents}
          context={this.state.context}
          modules={AllCommunityModules}
          onGridReady={this.onGridReady}
          rowSelection='multiple'
        />
        <p>Submitted Data</p>
      </div>
    );
  }
}

export default App;

