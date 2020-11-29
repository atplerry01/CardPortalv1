import React, { Component } from 'react';

export default class CmpModuleRoleTable extends Component {

    onHandleClick(value) {
        this.props.handleSelection(value);
    };

    render() {

        const list = () => {
            if (this.props.data) {
                return this.props.data.map((entity, index) => {
                    return (
                        <tr className="selection" key={index} onClick={this.onHandleClick.bind(this, entity)}>
                            <td>{index + 1}</td>
                            <td>{entity.module}</td>
                            <td>{entity.role}</td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div>
                <table style={this.mystyle} className="table table-striped">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Module</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }

    mystyle = {
        padding: "2px",
        fontFamily: "Arial",
        fontSize: "10px",
    };


}
