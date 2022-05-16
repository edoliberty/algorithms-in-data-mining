for FILE in *.tex; do 
	latex $FILE; 
	bibtex $FILE; 
	latex $FILE; 
	latex $FILE; 
done
