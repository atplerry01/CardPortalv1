import React, { Component } from 'react';
import { Router, Switch } from 'react-router';
import Authorized from '../components/hoc/authorization';
import AppRoute from '../layouts/AppRoute';
import LoginLayout from '../layouts/LoginLayout';
import MainLayout from '../layouts/MainLayout';
import AuditLog from '../pages/admin/Audit/AuditLog';
import FinacleRoleManager from '../pages/admin/FinacleRole/FinacleRoleManager';
import LookupPackage from '../pages/admin/LookupPackage/LookupPackage';
import RolePackageManager from '../pages/admin/RolePackage/RolePackageManager';
import RolePackageManagerEdit from '../pages/admin/RolePackage/RolePackageManagerEdit';
import ProfiledUsers from '../pages/admin/UserProfile/ProfiledUsers';
import UserProfile from '../pages/admin/UserProfile/UserProfile';
import DebitCards from '../pages/card-issuance/DebitCards';
import AddCreditCardsAlternateAccounts from '../pages/card-processing/AddCreditCardAlternateAccounts';
import CardHotlist from '../pages/card-processing/CardHotlist';
import CardSearch from '../pages/card-processing/CardSearch';
import CardSearchDetails from '../pages/card-processing/CardSearchDetails';
import CreditCardsAlternateAccounts from '../pages/card-processing/CreditCardsAlternateAccounts';
import DebitAdviceUpload from '../pages/card-processing/DebitAdviceUpload';
import DebitAdviceUploadEdit from '../pages/card-processing/DebitAdviceUploadEdit';
import DirectDebitExemption from '../pages/card-processing/DirectDebitExemption';
import DirectDebitExemptionEdit from '../pages/card-processing/DirectDebitExemptionEdit';
import CardAuthorizer from '../pages/card-support/CardAuthorizer';
import CardAuthorizerDetail from '../pages/card-support/CardAuthorizerDetail';
import CardControl from '../pages/card-support/CardControl';
import CardControlDetail from '../pages/card-support/CardControlDetail';
import CardExtraction from '../pages/card-support/CardExtraction';
import CardExtractionDetail from '../pages/card-support/CardExtractionDetail';
import CardUnitCollection from '../pages/card-support/CardUnitCollection';
import CardUnitCollectionDetail from '../pages/card-support/CardUnitCollectionDetail';
import CardUnitDelivery from '../pages/card-support/CardUnitDelivery';
import CardUnitDeliveryDetail from '../pages/card-support/CardUnitDeliveryDetail';
import CardUnitDispatchPerso from '../pages/card-support/CardUnitDispatchPerso';
import CardUnitDispatchPersoDetail from '../pages/card-support/CardUnitDispatchPersoDetail';
import CardUnitReceivePerso from '../pages/card-support/CardUnitReceivePerso';
import CardUnitReceivePersoDetail from '../pages/card-support/CardUnitReceivePersoDetail';
import CreditCardRequestActivation from '../pages/credit-card/CreditCardRequestActivation';
import CreditCardRequestDetails from '../pages/credit-card/CreditCardRequestDetails';
import CreditCardRequestLists from '../pages/credit-card/CreditCardRequestLists';
import CreditCardRequestOffer from '../pages/credit-card/CreditCardRequestOffer';
import CreditCardRequests from '../pages/credit-card/CreditCardRequests';
import CreditCardRequestSummary from '../pages/credit-card/CreditCardRequestSummary';
import CreditCardRequestType from '../pages/credit-card/CreditCardRequestType';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import NoMatch from '../pages/NoMatch';


export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: sessionStorage.getItem("wm.auth") !== null ? JSON.parse(sessionStorage.getItem("wm.auth")) : {}
    };
  }

  render() {
    const { history } = this.props;

    const DebitCardInitiator = Authorized([{ module: "DebitCardRequest", role: "initiator" }]);
    const DirectDebitProcessor = Authorized([{ module: "DirectDebit", role: "processor" }]);
    const DebitCardAuthorizer = Authorized([{ module: "DebitCardRequest", role: "authorizer" }]);
    const DebitCardControl = Authorized([{ module: "DebitCardRequest", role: "control" }]);
    const DebitCardExtraction = Authorized([{ module: "DebitCardRequest", role: "extractor" }]);
    const DebitCardUnits = Authorized([{ module: "DebitCardRequest", role: "cards" }]);
    const CardHotListInitiator = Authorized([{ module: "CardHotList", role: "initiator" }]);
    const CardSearchInitiator = Authorized([{ module: "CardSearch", role: "search" }]);
    const UserManagementInitiator = Authorized([{ module: "UserManagement", role: "initiator" }]);
    
    return (
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Dashboard} layout={MainLayout} />
          <AppRoute exact path="/cards/dashboard" component={Dashboard} layout={MainLayout} />
          
          <AppRoute exact path="/login" component={Login} layout={LoginLayout} />

          <AppRoute path="/cards/issuance/debit-cards" exact component={DebitCardInitiator(DebitCards)} layout={MainLayout} />

          <AppRoute path="/cards/authorizer" exact component={DebitCardAuthorizer(CardAuthorizer)} layout={MainLayout} />
          <AppRoute path="/cards/authorizer/:id" exact component={DebitCardAuthorizer(CardAuthorizerDetail)} layout={MainLayout} />

          <AppRoute path="/cards/controls" exact component={DebitCardControl(CardControl)} layout={MainLayout} />
          <AppRoute path="/cards/controls/:id" exact component={DebitCardControl(CardControlDetail)} layout={MainLayout} />

          <AppRoute path="/cards/extractors" exact component={DebitCardExtraction(CardExtraction)} layout={MainLayout} />
          <AppRoute path="/cards/extractors/:id" exact component={DebitCardExtraction(CardExtractionDetail)} layout={MainLayout} />

          <AppRoute path="/cards/unit/perso-receive" exact component={DebitCardUnits(CardUnitReceivePerso)} layout={MainLayout} />
          <AppRoute path="/cards/unit/perso-receive/:id" exact component={DebitCardUnits(CardUnitReceivePersoDetail)} layout={MainLayout} />
          <AppRoute path="/cards/unit/perso-dispatch" exact component={DebitCardUnits(CardUnitDispatchPerso)} layout={MainLayout} />
          <AppRoute path="/cards/unit/perso-dispatch/:id" exact component={DebitCardUnits(CardUnitDispatchPersoDetail)} layout={MainLayout} />
          <AppRoute path="/cards/unit/delivery" exact component={DebitCardInitiator(CardUnitDelivery)} layout={MainLayout} />
          <AppRoute path="/cards/unit/delivery/:id" exact component={DebitCardInitiator(CardUnitDeliveryDetail)} layout={MainLayout} />
          <AppRoute path="/cards/unit/collection" exact component={DebitCardAuthorizer(CardUnitCollection)} layout={MainLayout} />
          <AppRoute path="/cards/unit/collection/:id" exact component={DebitCardAuthorizer(CardUnitCollectionDetail)} layout={MainLayout} />

          <AppRoute path="/cards/admin/user-profile" exact component={UserManagementInitiator(UserProfile)} layout={MainLayout} />
          <AppRoute path="/cards/admin/profiled-users" exact component={UserManagementInitiator(ProfiledUsers)} layout={MainLayout} />
          <AppRoute path="/cards/admin/lookup-package" exact component={UserManagementInitiator(LookupPackage)} layout={MainLayout} />

          {/* 
          <AppRoute path="/cards/credit-card-request" exact component={CreditCardRequisition} layout={MainLayout} />
          <AppRoute path="/cards/credit-card-request/pending-requests" exact component={CreditCardRequisitionPendingRequests} layout={MainLayout} /> 
          */}

          <AppRoute path="/cards/credit-cards" exact component={CreditCardRequestLists} layout={MainLayout} />
          <AppRoute path="/cards/credit-cards/:id" exact component={CreditCardRequestDetails} layout={MainLayout} />
          <AppRoute path="/cards/credit-cards/offer" exact component={CreditCardRequestOffer} layout={MainLayout} />
          <AppRoute path="/cards/credit-cards/activation" exact component={CreditCardRequestActivation} layout={MainLayout} />
          <AppRoute path="/cards/credit-card-request" exact component={CreditCardRequests} layout={MainLayout} />
          <AppRoute path="/cards/credit-card-request/:type" exact component={CreditCardRequestType} layout={MainLayout} />
          <AppRoute path="/cards/credit-card-request/summary" exact component={CreditCardRequestSummary} layout={MainLayout} />

          <AppRoute exact path="/cards/admin/role-access-management" component={UserManagementInitiator(RolePackageManager)} layout={MainLayout} />
          <AppRoute exact path="/cards/admin/role-access-management/:id" component={UserManagementInitiator(RolePackageManagerEdit)} layout={MainLayout} />

          <AppRoute exact path="/cards/admin/finacle-role-management" component={UserManagementInitiator(FinacleRoleManager)} layout={MainLayout} />

          <AppRoute exact path="/cards/admin/audit-log" component={UserManagementInitiator(AuditLog)} layout={MainLayout} />

          <AppRoute exact path="/cards/cardsearch" component={CardSearchInitiator(CardSearch)} layout={MainLayout} />
          <AppRoute exact path="/cards/cardsearch/:id" component={CardSearchInitiator(CardSearchDetails)} layout={MainLayout} />
          <AppRoute exact path="/cards/cardhotlist"  component={CardHotListInitiator(CardHotlist)} layout={MainLayout} />

          <AppRoute exact path="/cards/credit-cards/alternate-accounts" component={DirectDebitProcessor(CreditCardsAlternateAccounts)} layout={MainLayout} />
          <AppRoute exact path="/cards/credit-cards/alternate-accounts/:id" component={DirectDebitProcessor(AddCreditCardsAlternateAccounts)} layout={MainLayout} />
          
          <AppRoute exact path="/cards/debit-advice-upload" component={DirectDebitProcessor(DebitAdviceUpload)} layout={MainLayout} />
          <AppRoute exact path="/cards/debit-advice-upload/:id" component={DirectDebitProcessor(DebitAdviceUploadEdit)} layout={MainLayout} />

          <AppRoute exact path="/cards/direct-debit-exemptions" component={DirectDebitProcessor(DirectDebitExemption)} layout={MainLayout} />
          <AppRoute exact path="/cards/direct-debit-exemptions/:id" component={DirectDebitProcessor(DirectDebitExemptionEdit)} layout={MainLayout} />

          <AppRoute component={NoMatch} layout={MainLayout} />

        </Switch>

      </Router>
    )
  }
}
