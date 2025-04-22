import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange, error = false }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      onChange(newOtpValues.join(''));

      // Move focus to next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (otpValues[index]) {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
        onChange(newOtpValues.join(''));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('Text').trim();
    if (/^\d+$/.test(pastedData)) {
      const newOtpValues = pastedData.split('').slice(0, length);
      while (newOtpValues.length < length) newOtpValues.push('');
      setOtpValues(newOtpValues);
      onChange(newOtpValues.join(''));
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-2">
      {otpValues.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-xl rounded-md border 
            ${error ? 'border-red-500' : 'border-black'} 
            focus:outline-none focus:border-black`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
