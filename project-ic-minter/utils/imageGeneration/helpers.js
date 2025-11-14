// function to split the impactBrief into lines
const splitString = (context, str, maxWidthPerLine) => {
    if (typeof str !== 'string' || typeof maxWidthPerLine !== 'number' || maxWidthPerLine <= 0) {
        throw new Error('Invalid input. Please provide a valid string and a positive number.');
    }
    const result = [];
    let currentLine = '';
    // Split the string into substrings
    str.split(' ').forEach(word => {
        if (context.measureText(currentLine + (currentLine.length > 0 ? ' ' : '') + word).width <= maxWidthPerLine) {
            currentLine = currentLine + (currentLine.length > 0 ? ' ' : '') + word;
        } else {
            result.push(currentLine);
            currentLine = word;
        }
    });
    // Add the last substring
    if (currentLine.length > 0) {
        result.push(currentLine);
    }
    return result;
}

const numberWithCommas = (number) => {
    let numStr = String(number);
    let parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts.length > 1) {
        parts[1] = convertAndTrimDecimals(parts[1], 5);
        if (parts[1].length > 0) {
            return parts.join('.')
        }
    }
    return parts[0];
}

function convertAndTrimDecimals(decimalString, decimalPlaces) {    
    // If length is less than or equals decimalPlaces, remove trailing zeros and return
    if (decimalString.length <= decimalPlaces) {
        return decimalString.replace(/0+$/, '');
    }
    
    // If length > decimalPlaces, need to check rounding
    const nextDigit = parseInt(decimalString[decimalPlaces]);
    
    if (nextDigit >= 5) {
        // Need to round up
        let result = '';
        let carry = 1;
        
        // Process digits from right to left
        for (let i = decimalPlaces - 1; i >= 0; i--) {
            let digit = parseInt(decimalString[i]) + carry;
            if (digit === 10) {
                digit = 0;
                carry = 1;
            } else {
                carry = 0;
            }
            result = digit.toString() + result;
        }
        
        return result.replace(/0+$/, ''); // Remove trailing zeros
    } else {
        // Just truncate to decimalPlaces digits and remove trailing zeros
        return decimalString.substring(0, decimalPlaces).replace(/0+$/, '');
    }
}

module.exports = {
    splitString,
    numberWithCommas
};