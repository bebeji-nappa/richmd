import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import './styles/normalize.css';
import './styles/index.css';

(UIkit.use as (UIkit: object) => void)(Icons);

export * from './richmdParse'
