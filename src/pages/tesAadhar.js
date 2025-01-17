import MainLayout from "@/layout/MainLayout";
import { Input, Typography } from "@mui/material";
import React from "react";

const formatNumberWithHyphens = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Split the value into groups of 4 digits
    const formattedValue = numericValue.match(/.{1,4}/g);

    // Join the groups with hyphens
    return formattedValue ? formattedValue.join("-") : "";
};

// Function to validate Aadhaar number using the Verhoeff algorithm
const isValidAadhaarNumber = (aadhaarNumber) => {
    const verhoeffTableD = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    const verhoeffTableP = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    const verhoeffTableInv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

    if (!/^\d{12}$/.test(aadhaarNumber)) {
        alert("flase")
        return false;
    }

    const str = aadhaarNumber.split("").reverse().join("");
    let c = 0;

    for (let i = 0; i < str.length; i++) {
        c = verhoeffTableD[c][verhoeffTableP[i % 8][str[i]]];
    }

    return c === 0;
};

const AadhaarInput = (props) => {
    // const { value, onChange } = props;
    let value="767068648765"
   const onChange = () => {}

    const handleChange = (e) => {
        const { value: inputValue } = e.target;

        if (inputValue.length <= 14) {
            const formattedValue = formatNumberWithHyphens(inputValue);
            onChange(formattedValue);
        }
    };

    const handleBlur = () => {
        // Optionally, you can remove leading zeros on blur
        const valueWithoutLeadingZeros = value.replace(/^0+/, "");
        if (
            isValidAadhaarNumber("257986388393")
        ) {
            alert("valid")
        } else {
            alert("unvalid")

        }
        onChange(valueWithoutLeadingZeros);
    };

    return (
        <MainLayout>
            <Typography
                style={{
                    fontSize: 12,
                    color: "#1876D1",
                }}
            >
                Aadhaar Number
            </Typography>

            <Input
                {...props}
                inputProps={{
                    maxLength: 14,
                }}
                autoComplete="off"
                size="sm"
                onChange={handleChange}
                onBlur={handleBlur}
                // placeholder={props.label}
            />
        </MainLayout>
    );
};

export default AadhaarInput;
