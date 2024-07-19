import React, { MouseEventHandler } from 'react'
import Image from 'next/image'

type Props = {
  status?: 'normal' | 'error' | 'success';
  show: boolean;
  onClickCallback: MouseEventHandler<HTMLImageElement>;
}

const ShowPasswordButton = ({ show, onClickCallback, status = 'normal' }: Props) => {
  return (
    <Image
      className="absolute right-[20px] top-[11px]"
      src={show ? "/show-password.svg" : "/hide-password.svg"}
      width={24}
      height={24}
      alt={show ? "Show password" : "Hide password"}
      onClick={onClickCallback}
    />
  )
}

export default ShowPasswordButton