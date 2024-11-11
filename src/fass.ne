main -> statement
	{% d => ({rule: "main", children: d }) %}

statement -> hexa 
	{% d => ({ rule: "statement", children: d }) %}

hexa -> "$" [0-9a-fA-F]:+ 
	{% d => ({ rule: "hexa", value: d[1].join("") }) %}

