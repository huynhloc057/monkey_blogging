import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputTogglePassword = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          togglePassword && (
            <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
          )
        )}
      </Input>
    </Fragment>
  );
};

export default InputTogglePassword;
