import * as React from "react";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[#8C929F]">{label}</span>
      {children}
    </label>
  );
}

export { FormField };
