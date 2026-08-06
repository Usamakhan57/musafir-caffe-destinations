interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  errors,
  defaultValue,
  required,
  disabled,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-coffee-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        className="rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-coffee-900 placeholder:text-coffee-300 transition-colors focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {errors?.map((error) => (
        <p key={error} className="text-xs text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
