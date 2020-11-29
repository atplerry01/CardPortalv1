import React, { Component } from 'react';
import { debitCardService } from '../../services/cards';
import CmpDebitUploadTable from './Components/cmpDebitUploadTable';

export default class DebitAdviceUpload extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    componentDidMount() {
        this.getDirectDebitUploads();
    }

    render() {
        const { uploadLists } = this.state;
        
        return (
            <>
                {/* <ContentHeader title="Manage Role Access" /> */}
                
                <div className="page-section">
                    <div className="section-block">
                        <div className="row">

                            <div className="col-xl-12">
                                <h5>Debit Advice Uploads</h5>
                                <CmpDebitUploadTable 
                                    data={uploadLists} 
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }

    getDirectDebitUploads = async () => {
        return await debitCardService.getDirectDebitUploads()
            .then(res => {
                if (res.success) {
                    this.setState({ uploadLists: res.data });
                }
            })
    }
}
