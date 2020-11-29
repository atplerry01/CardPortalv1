import React, { Component } from 'react';

export default class CmpRolePackageTable extends Component {

    onHandleClick(value) {
        this.props.handleSelection(value);
    };

    render() {

        const list = () => {
            if (this.props.data) {
                return this.props.data.map((entity, index) => {
                    return(
                        <tr className="selection" key={index} onClick={this.onHandleClick.bind(this, entity)}>
                            <td>{index + 1}</td>
                            <td>{entity.name}</td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div>
                <h6 style={{ margin: '10px 0 10px' }}>Roles</h6>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }
}
