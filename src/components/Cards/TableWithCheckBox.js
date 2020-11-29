import propTypes from "prop-types";
import React, { Component } from "react";
import { formatter } from "../../services/shared/formatter";

class TableWithCheckBox extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
  }

  onNavClick(value) {
    this.props.onNavClick(value);
  }


  onEditClicked(e, item) {
    e.preventDefault();
    const { onEditClicked } = this.props;
    onEditClicked(item);
  }

  onDeleteClicked(e, item) {
    e.preventDefault();
    const { onDeleteClicked } = this.props;
    onDeleteClicked(item);
  }

  
  onChangeAll(e) {
    const { handleCheckboxAllClick } = this.props;

    const { checked } = e.target;
    handleCheckboxAllClick(checked);
  }
  
  onChange(e) {
    const { handleCheckboxChange, dataBody } = this.props;

    const { id, checked, name } = e.target;

    let checkId = "" + id.replace("" + name, "");

    const selectedItem = dataBody.filter(
      (body, index) => index === Number(checkId)
    );

    handleCheckboxChange({ item: selectedItem[0], checked });
  }

  render() {
    const {
      headerCheckBoxId,
      dataHeader,
      dataBody,
      selectedCheckedItems,
      onEditClicked,
      onDeleteClicked
    } = this.props;

    let f = formatter(dataHeader, dataBody);
    const headerTitle = f.headerTitle;

    let headerName = f.headerName;

    const formatedBody = f.dataBody;

    let tableItems = formatedBody.map((item, index) => {
      let isChecked = false;
      let hasItem = selectedCheckedItems.find(
        obj => JSON.stringify(obj) === JSON.stringify(item)
      );

      if (hasItem) {
        isChecked = true;
      }
      let row = [];
      headerName.forEach((name, index) => {
        let value = item[name];

        if (name === 'module') {
          value = item[name].map((obj) => {
            return `${obj.name} (${obj.role})`;
          }).join('\n');

        }


        row.push(<td key={index}> {value} </td>);
      });

      let idValue = `${headerCheckBoxId}${index}`;
      return (
        <tr key={index}>
          <td>
            <span className="custom-control custom-control-nolabel custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                onChange={this.onChange.bind(this)}
                checked={isChecked}
                disabled={false}
                name={headerCheckBoxId}
                id={idValue}
              />
              <label className="custom-control-label" htmlFor={idValue}></label>
            </span>
          </td>
          {row}
          <td onClick={this.onNavClick.bind(this, item)} style={{ cursor: 'pointer' }}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>View
          </td>
          {onEditClicked && (
            <td>
              <button type="button" onClick={(e) => { this.onEditClicked(e, item) }} className="btn btn-primary-outline">
                <span className="menu-icon fas fa-pen"></span>
              </button>
            </td>
          )}
          {onDeleteClicked && (
            <td>
              <button type="button" onClick={(e) => { this.onDeleteClicked(e, item) }} className="btn btn-primary-outline">
                <span className="menu-icon fas fa-trash"></span>
              </button>
            </td>
          )}
        </tr>
      );
    });

    const _items = headerTitle.map((detail, index) => (
      <td key={index}> {detail} </td>
    ));

    let isChecked = false;

    if (selectedCheckedItems.length === dataBody.length) {
      isChecked = true;
    }

    return (
      <table className="table table-striped">
        <thead className="thead-">
          <tr>
            <td>
              <div className="thead-dd dropdown">
                <span className="custom-control custom-control-nolabel custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={this.onChangeAll.bind(this)}
                    checked={isChecked}
                    disabled={false}
                    id={headerCheckBoxId}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={headerCheckBoxId}
                  ></label>
                </span>
              </div>
            </td>
            {_items}
            {onEditClicked && <td></td>}
            {onDeleteClicked && <td></td>}
          </tr>
        </thead>

        <tbody>{tableItems}</tbody>
      </table>
    );
  }
}

TableWithCheckBox.propTypes = {
  headerCheckBoxId: propTypes.string,
  dataHeader: propTypes.array.isRequired,
  dataBody: propTypes.array.isRequired,
  selectedCheckedItems: propTypes.array.isRequired,
  handleCheckboxChange: propTypes.func.isRequired,
  handleCheckboxAllClick: propTypes.func.isRequired
};

export default TableWithCheckBox;
