import React from 'react';

const PersonForm = ({ onSubmit, handleNameChange, handlePhoneChange, phone, name }) => (
	<form onSubmit={onSubmit} >
		<div>name: <input onChange={handleNameChange} value={name} /></div>
		<div>phone: <input onChange={handlePhoneChange} value={phone} /></div>
		<div><button type="submit">add</button></div>
	</form>
);

export default PersonForm;