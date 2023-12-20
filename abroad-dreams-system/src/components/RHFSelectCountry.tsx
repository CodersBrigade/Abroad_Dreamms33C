import React from "react";
import { useFormContext } from "react-hook-form";

export function RHFSelectCountry({
  name,
  options,
  placeholder,
  className,
}: {
  name: string;
  options?: any[];
  placeholder: string;
  className?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`default-input ${className || ""}`}>
      <select {...register(name)} defaultValue="" className="select">
        <option value="" disabled>
          {placeholder}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {errors ? (
        <p style={{ color: "red" }}>{errors[name]?.message as string}</p>
      ) : null}
    </div>
  );
}
