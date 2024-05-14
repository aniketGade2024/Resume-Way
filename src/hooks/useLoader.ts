import React from "react";

const useLoader = () => {
    const [loader, setLoader] = React.useState<boolean>(false);

    const showLoader = () => {
        setLoader(true);
    }

    const hideLoader = () => {
        setLoader(false);
    }

    return ({
        loader, showLoader, hideLoader
    })

}

export default useLoader;