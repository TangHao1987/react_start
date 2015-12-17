require("script!jquery/jquery.js");
require("script!bootstrap/dist/js/bootstrap.js");
require("script!react/react-with-addons.js");
require("script!react/react-dom.js");

/**
 * Created by tang.hao on 14/12/2015.
 */
import App from './component/App';

ReactDOM.render( <App></App>, document.getElementById('app'));