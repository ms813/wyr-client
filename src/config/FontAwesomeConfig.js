import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheckCircle, fas, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

const FontAwesomeConfig = () => {
    return library.add(fas, faCheckCircle, faTimesCircle);
};

export default FontAwesomeConfig;