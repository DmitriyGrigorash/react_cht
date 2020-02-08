import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputField = ({input, label, name, meta, type}) => {
	const error = meta.touched && meta.error;
	return (
		<div className="InputField">
			<TextField
		        type={type}
		        margin="normal"
		        label={error ? meta.error : label}
		        name={name}
		        fullWidth
		        error={!!error}
		        {...input}
      		/>
		</div>
	)
};

export default InputField;
