import { useEffect, useRef, useState } from "react";
import css from '../../assets/css/Dropdown.module.css'
import { useTheme } from "../../context/ThemeContext";
import { SaveCurrency } from "../../service/SaveCurrency";
import { toast } from "sonner";
import { useUser } from "../../context/authContext";

interface DropdownOption {
  label: string;
  value: string;
  flag?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown = ({
  options,
  value,
  placeholder = "Select an option",
  onChange,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { theme } = useTheme();
  const { refreshUser } = useUser();

  const handleSelect = async(option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
    // save the value
    try {
      const result = await SaveCurrency(option.value);
      if (!result.success) {
        toast.error(result.message || 'Something went wrong');
        return;
      }
      await refreshUser();
      // toast.success('Currency updated');
      setIsOpen(false);
    }

    catch (e) {
      console.log(e);
      toast.error('Something went wrong');
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${css['custom-dropdown']} ${className}`}
    >
      {/* Button */}
      <button
        type="button"
        className={css['dropdown-button']}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>
          { selectedOption?.flag && (
            <span style={{ fontSize: '12px' }} className={`fi fi-${selectedOption.flag} me-2`}></span>
          )}
        </span>
        <span>
          {selectedOption?.label || placeholder}
        </span>

        <span className={`${css.arrow} ${isOpen ? css.open : ""}`}>
          ▼
        </span>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <ul className={theme === 'dark' ? css['dark-dropdown-list'] : css['dropdown-list']}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`${css['dropdown-option']} ${
                  value === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.flag && (
                  <span style={{ fontSize: '12px' }} className={`fi fi-${option.flag} me-2`}></span>
              )}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;