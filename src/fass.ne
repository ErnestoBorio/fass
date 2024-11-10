main -> statement
statement -> hexa
hexa -> "$" [0-9a-fA-F]:+ {% d => parseInt(d[1].slice(0,4), 16) %}