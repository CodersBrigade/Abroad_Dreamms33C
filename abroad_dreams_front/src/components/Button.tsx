
import { Link } from 'react-router-dom';

type Props = {
    label: string;
    iconUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fullWidth?: boolean;
    to?: string;
};

const Button = ({
                    label,
                    iconUrl,
                    backgroundColor,
                    textColor,
                    borderColor,
                    fullWidth,
                    to,
                }: Props) => {
    if (to) {
        // If 'to' prop is provided, render a Link
        return (
            <Link
                to={to}
                className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full
          ${
                    backgroundColor
                        ? `${backgroundColor} ${textColor} ${borderColor}`
                        : `bg-coral-red text-white border-coral-red`
                }
          ${fullWidth && 'w-full'}
        `}
            >
                {label}

                {iconUrl && (
                    <img src={iconUrl} alt="Icon" className="ml-2 rounded-full w-5 h-5" />
                )}
            </Link>
        );
    }

    // If 'to' prop is not provided, render a button
    return (
        <button
            className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full
        ${
                backgroundColor
                    ? `${backgroundColor} ${textColor} ${borderColor}`
                    : `bg-coral-red text-white border-coral-red`
            }
        ${fullWidth && 'w-full'}
      `}
        >
            {label}

            {iconUrl && (
                <img src={iconUrl} alt="Icon" className="ml-2 rounded-full w-5 h-5" />
            )}
        </button>
    );
};

export default Button;
