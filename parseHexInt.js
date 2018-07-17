const parseHexInt = hex => /[^\da-f]/i.test(hex) ? NaN : [...hex.toLowerCase()].reverse().reduce((n, ch, i) => '0123456789abcdef'.indexOf(ch) * (16 ** i) + n, 0);

/*
A single-line function to parse hex strings into decimal values without using any inbuilt translation functions (such as parseInt). It works as follows: 

The input is first tested against a regular expression that matches against anything that isn't either a digit or the letters a-f. If it matches, the input contains an invalid character, and parseHexInt returns NaN. If not, the input is spread into an array of lowercase characters, reversed (explained momentarily), and passed through a reduce function.

The function finds the character's base value by using indexOf(character) on a string in which each character is positioned at the index that corresponds to its value. But to find the total value of the hexadecimal input we also need to know which power of its base to raise it to. For example, everyday numbers use base-10, so the value of, say, the number 2468 is calculated as (2 x 1000) + (4 x 100) + (6 x 10) + (8 x 1),  or (2 x 10^3) + (4 x 10^2) + (6 x 10^1) + (8 x 10^0); in other words, the value of a digit in a written number is equal to its individual value multiplied by its base raised to the power of how many characters it is offset from the right-hand side of the string. Hexadecimal is base-16, so we use x16 instead of x10, but we still need to know what power to raise each digit to. 

This is solved by reversing the string before reducing it - by reversing, we bring each character in line with an index value that matches the power it needs to be raised to. To find the character's final value, then, we simply multiply it by 16 raised to the power of its index. Finally we add it to the accumulator, which will continue through the loops until it is returned as the total decimal value of the input hex string.  
*/
