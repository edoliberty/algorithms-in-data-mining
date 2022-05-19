for DIR in algorithms-in-data-mining-*; do 
	pushd $DIR
	rm *.aux *.bbl *.blg *.dvi *.log
	for FILE in *.tex; do 
		pdflatex $FILE; 
		bibtex "${FILE%.*}" ;
		pdflatex $FILE; 
		pdflatex $FILE; 
	done
	rm *.aux *.bbl *.blg *.dvi *.log
	popd
done
