"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Loader_1 = require("components/Loader");
var config_1 = require("components/Loader/config");
var actions_1 = require("store/metaStore/actions");
var matchUrl_1 = require("utils/matchUrl");
var App_module_scss_1 = require("./App.module.scss");
var FriendsPage_1 = require("./FriendsPage/index");
var ProfilePage_1 = require("./ProfilePage/index");
var WishListPage_1 = require("./WishListPage");
var classNames = require('classnames/bind');
var cn = classNames.bind(App_module_scss_1.default);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentDidMount = function () {
        this.props.initVkApp();
        this.props.initToken();
    };
    App.prototype.render = function () {
        var isLoading = this.props.isLoading;
        return (<react_router_dom_1.BrowserRouter>
        {isLoading ? (<Loader_1.default size={config_1.loaderSizes.LARGE} className={cn('app__loader')}/>) : (<div className={cn('app')}>
            <react_router_dom_1.Route path={matchUrl_1.route.FRIENDS.url} render={function (props) { return <FriendsPage_1.default {...props}/>; }}/>
            <react_router_dom_1.Route path={matchUrl_1.route.WISH_LIST.url} render={function (props) { return <WishListPage_1.default {...props}/>; }}/>
            <react_router_dom_1.Route path={matchUrl_1.route.PROFILE.url} render={function (props) { return <ProfilePage_1.default {...props}/>; }}/>
            <react_router_dom_1.Route path={matchUrl_1.route.FRIEND.url} render={function (props) { return <ProfilePage_1.default {...props}/>; }}/>
            <react_router_dom_1.Redirect to={matchUrl_1.route.WISH_LIST.url}/>
          </div>)}
      </react_router_dom_1.BrowserRouter>);
    };
    return App;
}(React.Component));
var mapStateToProps = function (state) { return ({
    isLoading: state.meta.isLoading,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    initVkApp: function () { return dispatch(actions_1.actionVkInitApp()); },
    initToken: function () { return dispatch(actions_1.actionInitToken()); },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
