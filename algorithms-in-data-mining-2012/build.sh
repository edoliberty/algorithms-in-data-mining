rm *.aux
rm *.bbl
rm *.blg
rm *.dvi
rm *.log

for FILE in *.tex; do 
	pdflatex $FILE; 
	bibtex "${FILE%.*}" ;
	pdflatex $FILE; 
	pdflatex $FILE; 
done
