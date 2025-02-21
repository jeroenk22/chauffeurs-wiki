import React from "react";

interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  textarea?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  textarea = false,
  onFocus, // ✅ Correct destructureren
  onBlur, // ✅ Correct destructureren
}) => {
  return textarea ? (
    <textarea
      placeholder={placeholder}
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e as any)} // Forceer type
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
    />
  );
};

export default FormInput;
