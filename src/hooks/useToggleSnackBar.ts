import { useState } from 'react';

const useToggleSnackbar = () => {
	const [showToggle, setToggle] = useState(false);

	const toggleSnackBar = () => {
		setToggle(!showToggle);
	};

	return {
		toggleSnackBar,
		showToggle,
	};
};

export default useToggleSnackbar;
