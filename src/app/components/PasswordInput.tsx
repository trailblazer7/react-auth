import React, { ChangeEventHandler, useState } from 'react'
import ShowPasswordButton from './ShowPasswordButton';

type Props = {
  value: string;
  onChangeCallback: ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({ value, onChangeCallback }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create your password"
        className="input-base"
        onChange={onChangeCallback}
        value={value}
      />
      <ShowPasswordButton 
        show={showPassword}
        onClickCallback={() => setShowPassword(!showPassword)} 
      />
    </div>
  )
}

export default PasswordInput