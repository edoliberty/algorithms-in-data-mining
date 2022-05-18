## Algorithms in Data Mining
Data Mining is concerned with efficiently extracting statistics, patterns, structures, or meanings from raw data. This task becomes hard when the amount of data is large, which is often the case in modern data sets.

This year the class will focus mostly on the streaming model. In this model the data is presented to the algorithm one item at a time (items can be: integers, strings, documents, sets, matrix entries, etc...). The algorithm must process the stream under sever space limitations. This is a common scenario in modern mining of massive data sets and presents interesting algorithmic challenges.

We will cover among other topics: sampling, finding frequent items, counting distinct elements, general frequency moment estimation, finding frequent item sets, clustering, dimensionality reduction, support vector machines, online convex optimization, linear regression, and matrix approximation.

I highly recommend that students be familiar with probability theory, combinatorics, linear algebra, basic complexity, and data structures. The class will attempt to be self contained but this is not always possible. Moreover, the class is devoted to ideas, algorithms, and proofs. Students who are interested in explicit data mining applications should not register. To quote a student feedback from last year "you think you're going to get an interesting course and you end up getting a load of math".

### Class Details
The class takes place 17:00 to 20:00 every Monday.

### Undergraduate students:
* Assignments (50% of the grade).
* Final exam (50% of the grade).

### Masters and PhD students:
* Assignments (50% of the grade).
* Either final exam or Final Project (50% of the grade).
* Projects can contain both theoretical and experimental elements and should require roughly two weeks' worth of effort.

### Student Projects
You should submit one PDF document containing your project motivation, background, data review, mathematical derivations, experimental results and discussion. You should include any other information you see fit, for example, pseudocode etc.

The deadline for project submission is May 19th 2013

## Build
On unix like systems with the bibtex and pdflatex availble you should be able to do this:
```
git clone git@github.com:edoliberty/algorithms-in-data-mining.git
cd algorithms-in-data-mining/algorithms-in-data-mining-2013 
./build
```