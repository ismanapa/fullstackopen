import React from 'react';

const CustomInput = ({ type, value, onChange }) => (
	<input
		value={value}
		type={type}
		onChange={onChange}
	/>
);

export default CustomInput;