import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 16px 20px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    resize: none;
    min-height: 200px;
  }

  textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }

  textarea::placeholder {
    color: #84878b;
  }
`;

const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea type={type} id={name} {...field} {...props} />
    </TextareaStyles>
  );
};

export default Textarea;
