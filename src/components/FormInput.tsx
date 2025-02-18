import React from "react";

interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  textarea?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  textarea = false,
}) => {
  return textarea ? (
    <textarea
      placeholder={placeholder}
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      required={required}
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default FormInput;
