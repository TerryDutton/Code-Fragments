const parseHexInt = hex => /[^\da-f]/gi.test(hex) ? NaN : [...hex.toLowerCase()].reverse().reduce((n, ch, i) => (isNaN(+ch) ? 'abcdef'.indexOf(ch) + 10 : +ch) * (16 ** i) + n, 0);

module.exports = {parseHexInt};

/*
A single-line function to parse hex strings into decimal values without using any inbuilt translation functions (such as parseInt). It works as follows: 

The input is first tested against a regular expression that matches against anything that isn't either a digit or the letters a-f. If it matches, the input contains an invalid character, and parseHexInt returns NaN. If not, the input is spread into an array of lowercase characters, reversed (explained momentarily), and passed through a reduce function.

To find the value of the hexadecimal input we need to find not only the value of each digit, but the value of the digit relative to its position in the string (for example, in the decimal number 33, the right-hand 3 is worth three, but the left-hand 3 is worth thirty). To find the value of a character, the reduce function tries to convert it to a number and then checks if the conversion produced NaN. If it didn't then the character is a number and thus it has a numerical value by default. If it did, it's a letter. In hexadecimal, a, b, c, d, e, and f represent 11, 12, 13, 14, and 15 respectively; to assign this value, we have a string abcdef. Each character's index value in this string matches its hexadecimal value minus 10, so we simply find the index of the character and add 10. 

We have the character value; now we need to change it based on position. In an ordinary decimal number, the rightmost digit is equal to itself (or, technically: itself x 1), the next is itself x 10, the next is itself x 10 x 10, and so forth. In other words, each digit is raised by an additional power of 10 (10^1, 10^2 etc). The first digit, which was 'itself x 1', is also being raised by a power of 10... 10^0, because any number raised to the power of 0 becomes 1. Hexadecimal follows this pattern but with x16 instead of x10, and so we need to find the power each digit must be raised to to get its final value. 

This is solved by reversing the string before reducing it - by reversing, we bring each character in line with an index value that matches the power it needs to be raised to. To find the character's final value, then, we simply multiply it by 16 raised to the power of its index. Finally we add it to the accumulator, which will continue through the loops until it is returned as the total decimal value of the input hex string.  
*/