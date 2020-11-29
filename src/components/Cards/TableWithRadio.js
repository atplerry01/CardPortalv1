import propTypes from "prop-types";
import React, { Component } from "react";
import { formatter } from "./../../services/shared/formatter";

class TableWithRadio extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { selectedRadioItem, name, dataHeader, dataBody } = this.props;

    this.setState({
      selectedRadioItem,
      name,
      dataHeader,
      dataBody
    });
  }

  onChange(e) {
    const chosenItem = this.props.dataBody.filter((body, index) => {
      const { name, id } = e.target;
      let radioId = "" + id.replace("" + name, "");

      if (Number(index) === Number(radioId)) {
        return body;
      }
      return false;
    });

    this.props.handleRadioChange(chosenItem[0]);
  }

  render() {
    const { selectedRadioItem, name, dataHeader, dataBody } = this.props;

    let dataFormatter = formatter(dataHeader, dataBody);
    const headerTitle = dataFormatter.headerTitle;

    let headerName = dataFormatter.headerName;

    const formatedBody = dataFormatter.dataBody;

    let tableItems = formatedBody.map((item, index) => {
      let isChecked = false;

      if (item === selectedRadioItem) {
        isChecked = true;
      }
      let row = [];
      headerName.forEach((name, index) => {
        row.push(<td key={index}> {item[name]} </td>);
      });

      const id = `${name}${index}`;

      return (
        <tr key={index}>
          <td>
            <span className="custom-control custom-control-nolabel custom-checkbox">
              <input
                type="radio"
                className="custom-control-input"
                name={name}
                onChange={this.onChange}
                checked={isChecked}
                item={item}
                id={id}
              />
              <label className="custom-control-label" htmlFor={id}></label>
            </span>
          </td>
          {row}
        </tr>
      );
    });

    const _items = headerTitle.map((detail, index) => (
      <td key={index}> {detail} </td>
    ));

    return (
      <table className="table table-striped">
        <thead className="thead-">
          <tr>
            <td></td>
            {_items}
          </tr>
        </thead>

        <tbody>{tableItems}</tbody>
      </table>
    );
  }
}

TableWithRadio.propTypes = {
  name: propTypes.string.isRequired,
  dataHeader: propTypes.array,
  dataBody: propTypes.array,
  selectedRadioItem: propTypes.any
};

export default TableWithRadio;

// import propTypes from "prop-types";
// import React, { Component } from "react";
// import { formatter } from "./../../services/_shared/formatter";


// class TableWithRadio extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedRadioItem: [], name: '', dataHeader: [], dataBody: []
//     };
//     this.onChange = this.onChange.bind(this);
//   }

//   componentDidMount() {
//     const { selectedRadioItem, name, dataHeader, dataBody } = this.props;

//     this.setState({
//       selectedRadioItem, name, dataHeader, dataBody
//     });
//   }

//   onChange(e) {
//     const chosenItem = this.state.dataBody.find((body) => Number(body.id) === Number(e.target.id));
//     this.props.handleRadioChange(chosenItem);
//   }

//   render() {
//     const { name, dataHeader, dataBody } = this.state;
//     const { selectedRadioItem } = this.props;

//     let dataFormatter = formatter(dataHeader, dataBody);
//     const headerTitle = dataFormatter.headerTitle;

//     let headerName = dataFormatter.headerName;

//     const formatedBody = dataFormatter.dataBody;
//     let tableItems = formatedBody.map((item, index) => {
//       let isChecked = false;
//       if (item.id === selectedRadioItem.id) {
//         isChecked = true;
//       }
//       let row = [];
//       headerName.forEach((name, index) => {

//         row.push(<td key={index} > {item[name]} </td>);
//       });

//       const id = `${name} ${index}`;

//       return (
//         <tr key={index}>
//           <td>
//             <span className="custom-control custom-control-nolabel custom-checkbox">
//               <input type="radio"
//                 className="custom-control-input"
//                 name={name}
//                 onChange={this.onChange}
//                 checked={isChecked}
//                 item={item}
//                 id={item.id} />
//               <label className="custom-control-label" htmlFor={item.id}></label>
//             </span>

//           </td>
//           {row}
//         </tr>
//       );
//     });



//     const _items = headerTitle.map((detail, index) => <td key={index} > {detail} </td>);

//     return (
//       <table className="table table-striped">
//         <thead className="thead-">
//           <tr>
//             <td></td>
//             {_items}
//           </tr>
//         </thead>

//         <tbody>

//           {tableItems}
//         </tbody>
//       </table>
//     );
//   }
// }

// TableWithRadio.propTypes = {

//   name: propTypes.string.isRequired,
//   dataHeader: propTypes.array,
//   dataBody: propTypes.array,
//   selectedRadioItem: propTypes.any,

// }

// export default TableWithRadio;
