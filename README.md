# Continuous Color Grid Count Challenge
In this challenge, contestors need to write a program to analyse a given color grid, and find out the largest continuous color block in the given grid. Here is an example of the color grid problem.



As shown in the picture above, a color grid is a two-dimensional board formed by color nodes. Here are some Facts about the color grid:

Each color grid consists of Rows and Columns, where the rows and columns can be uneven

Each Node in the color grid has its color code (e.g. Blue, Red, Green, etc), and also coordinates

Each node can have a number of Neighbour/Adjacent Nodes. Depend on its location/coordinate, a node can have up to 4 neighbour nodes, or two neighbour nodes if it’s in the corner.

The color grid can have N number of colors, and X number of rows, as well as Y number of columns. N, X, Y are unknown in the problem, and is not given at the beginning of the test 

The challenge: since each color node can be adjacent to a number of other color nodes, you need to find out the largest connecting block of nodes with the same color. (In the above image, by looking at the image we know that the largest block of joining nodes is at the bottom part of the image with blue color)

Solution:

You can choose the programming language of your choice

You can use any types of data model to store the grid information

You can use any algorithm in your program to conduct the search

The solution will be evaluated based on its accuracy and speed

Tips:

Start with designing the right data model to store the color grid and search result

Try avoid using recursion for large color grid, however, recursion can be used in some cases with careful design
