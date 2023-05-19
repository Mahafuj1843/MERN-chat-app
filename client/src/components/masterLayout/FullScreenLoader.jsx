import React, {Fragment} from 'react';
import { useSelector } from 'react-redux';

const FullScreenLoader = () => {
    const loader = useSelector((state)=>state.setting.loader)
    return (
        <Fragment>
            <div className="LoadingOverlay" style={{display: loader}}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};
export default FullScreenLoader;