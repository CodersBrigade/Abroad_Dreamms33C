import { useFormContext } from "react-hook-form";

export function RHFInput({
  name,
  type,
  options,
  placeholder,
  className,
}: {
  name: string;
  type?: string;
  options?: any;
  placeholder: string;
  className?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={`default-input ${className || ""}`}>
      <input
        type={type || "text"}
        placeholder={placeholder}
        {...register(name, options)}
      />
      {errors ? (
        <p style={{ color: "red" }}>{errors[name]?.message as string}</p>
      ) : null}
    </div>
  );
}
