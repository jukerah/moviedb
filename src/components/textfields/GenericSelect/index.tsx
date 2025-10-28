import { useId } from "react";
import styles from "./styles.module.css";

type Option = {
  label: string;
  value: string | number;
};

type LabelPosition = "top" | "left";

type GenericSelectProps = {
  id?: string;
  label: string;
  options: Option[];
  labelPosition?: LabelPosition;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * GenericSelect component
 *
 * A reusable and accessible select input component with optional label positioning.
 *
 * ---
 * ### Features
 * - Custom label positioning: top or left
 * - Uses native HTML `<select>` for full accessibility
 * - Accepts any standard `<select>` attributes via rest props
 *
 * ---
 * ### Accessibility
 * - Proper use of `label` and `htmlFor` ensures screen reader compatibility
 *
 * ---
 * ### Props
 * @typedef {Object} GenericSelectProps
 * @property {string} id - Unique identifier for the select element (required)
 * @property {string} label - Text label associated with the select input
 * @property {Array<{label: string, value: string | number}>} options - List of selectable options
 * @property {"top" | "left"} [labelPosition="top"] - Defines label position: above or left of the select
 * @property {string} [className] - Additional CSS class names for wrapper styling
 * @property {React.SelectHTMLAttributes<HTMLSelectElement>} rest - Additional DOM props forwarded to `<select>`
 *
 * ---
 * ### Example
 * @component
 * @example
 * ```tsx
 * <GenericSelect
 *   id="genre"
 *   label="Genre"
 *   labelPosition="left"
 *   options={[
 *     { label: "Action", value: "action" },
 *     { label: "Drama", value: "drama" },
 *   ]}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 *
 * @returns {JSX.Element}
 */
export const GenericSelect = ({
  id,
  label,
  options,
  labelPosition = "top",
  className = "",
  ...rest
}: GenericSelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={`${styles.wrapper} ${styles[labelPosition]} ${className}`}>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
