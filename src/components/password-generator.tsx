"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";
//  import image
import Image from 'next/image'
import bgImage from '../../public/image.webp'; // Import the image at the top
// Import custom UI components from the UI directory
import {
  Card
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";

// Default export of the GeneratePasswordComponent function
export default function GeneratePassword() {
  // State hooks for managing password generation options and the generated password
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  // Handler for updating the length state on input change
  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  // Function to generate a password based on selected options
  const generatePassword = (): void => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = "";
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === "") {
      alert("Please select at least one character type."); // Alert if no character types are selected
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex]; // Generate password character by character
    }
    setPassword(generatedPassword); // Set the generated password state
  };

  // Function to copy the password to the clipboard
  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!"); // Alert on successful copy
      },
      () => {
        alert("Failed to copy password to clipboard."); // Alert on failed copy, remove err parameter
      }
    );
  };

  // Handler for updating the checkbox states
  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  // JSX return statement rendering the password generator UI
  return (
    <div className=" relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
       <Image
  src={bgImage}
  layout="fill"
  objectFit="cover"
  alt="Background Image"
/>
      {/* Center the password generator card within the screen */}
      <Card className=" relative w-full max-w-md p-6  dark:bg-gray-800 shadow-lg rounded-lg bg-gradient-to-br from-yellow-400 via-gray-400 to-orange-300">
        <div className="mx-auto max-w-md space-y-6">
          {/* Header with title and description */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Password Generator</h1>
            <p className="text-gray-500 dark:text-gray-400 ">
              Create a secure password with just a few clicks.
            </p>
          </div>
          {/* Main content area for password options and input */}
          <div className="space-y-4">
            {/* Input for password length */}
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full"
              />
            </div>
            {/* Checkboxes for character type inclusion */}
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            {/* Button to generate password */}
            <Button type="button" className="w-full shadow-lg rounded-lg text-black  bg-gradient-to-br from-yellow-400 via-gray-400 to-orange-300" onClick={generatePassword}>
              Generate Password
            </Button>
            {/* Display the generated password and button to copy */}
            <div className="space-y-2 ">
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1"
                />
                <Button type="button" className=" text-black shadow-lg rounded-lg bg-gradient-to-br from-yellow-300 via-gray-400 to-orange-400 border-lg" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}