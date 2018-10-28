
//Lucas Manker
//Cosc 3020
//10/22/18
//Lab 6


function fill(num){
	//fills a square matrix with zeroes depending on the number of vertices.
	var matrix = [];
	for(var i = 0; i < num; i++){
		var row = [];
		for(var j = 0; j < num; j++){
			row[j] = 0;
		}
		matrix[i] = row;
	}
	return matrix;
}

function addWeight(x, y, weight, matrix){
	//changes the entries in the matrix
	var tempRow = matrix[x - 1];
	tempRow[y - 1] = weight;
	matrix[x - 1] = tempRow;
}

function testCase(){
	//fills the matrix with the entries specified in the assignment
	testMatrix = fill(8);
	weightArray = [[1,4,4],[1,2,2], [1,3,1], [2,6,2], [2,5,10], [2,3,1],
	               [3,1,9], [3,5,8], [4,3,2], [5,4,7], [5,7,1], [6,8,3],
	               [7,6,2], [7,5,4], [8,7,1]];
	for(var i = 0; i < weightArray.length; i++){
		var tempV = weightArray[i];
		addWeight(tempV[0], tempV[1], tempV[2], testMatrix);
	}
	console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-Adj Matrix+-+-+-+-+-+-+-+-+-+-+-");
	console.log(testMatrix);
	console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-Distance List+-+-+-+-+-+-+-+-+-+-+-");
	return testMatrix;
}

function testCase2(){
	//fills the matrix with the entries specified in the assignment
	testMatrix = fill(9);
	weightArray = [[1,2,4],[1,8,8], [2,1,4], [2,8,11], [2,3,8], [3,2,8], [3,4,7],
	              [3,6,4], [3,9,2], [4,3,7], [4,5,9], [4,6,14], [5,4,9], [5,6,10],
	              [6,4,14], [6,3,4], [6,7,2], [6,5,10], [7,6,2], [7,9,6], [7,8,1],
	              [8,7,1], [8,9,7], [8,2,11], [8,1,8], [9,3,2], [9,7,6], [9,8,7],];
	for(var i = 0; i < weightArray.length; i++){
		var tempV = weightArray[i];
		addWeight(tempV[0], tempV[1], tempV[2], testMatrix);
	}
	console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-Adj Matrix+-+-+-+-+-+-+-+-+-+-+-");
	console.log(testMatrix);
	console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-Distance List+-+-+-+-+-+-+-+-+-+-+-");
	return testMatrix;
}

function dijsktra(matrix, vertex){
	var distance = [];
	var visited = [];

	for(var i = 0; i < matrix.length; i++){
		distance[i] = Infinity;
		//fills the vertices with infinity since we
		//haven't been to adjacent nodes yet
	}

	distance[vertex] = 0;
	//distance to vertex you're starting from always zero

	while(visited.length < matrix.length){
		console.log(distance);
		//loops until we've hit ever vertex
		var next = visitNext(distance, visited);
		//finds out which node to visit next based on min distance
		visited.push(next);
		//adding the visited node to the visted list
		updateDist(distance, matrix[next], distance[next]);
		//update the distance list based on the information we gained
		//from the newly visited vertex
	}
	printDist(distance, vertex);
}

function visitNext(distance, visited){
	tempRow = [];
	//making a deep copy of array
	for(var i = 0; i < distance.length; i++){
		tempRow[i] = distance[i];
	}
	for(var i = 0; i < visited.length; i++){
		var index = visited[i];
		tempRow[index] = Infinity;
		//making all vertices we've visited equal to inf
		//so we don't backtrack
	}
	var min = tempRow.indexOf(Math.min(...tempRow));
	//finding the minimum distance to the next vertex we haven't 
	//traveled to.
	return min;
}

function updateDist(distance, row, dist){
	//updating the minimum distance after we've visited our new vertex.
	for(var i = 0; i < distance.length; i++){
		if(row[i]){
			var size = dist + row[i];
			if(size < distance[i]){
				distance[i] = size;
			}
		}
	}
}

function printDist(distance, vertex){
	//prints out the distances based on the vertex chosen
	console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-Shortest Distances+-+-+-+-+-+-+-+-+-+-+-");
	var alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var vert = alpha[vertex];
	for(var i = 0; i < distance.length; i++){
		console.log('The minimum distance between', vert, 'and', alpha[i], 'is',
			distance[i]);
	}
}
var test = testCase();
dijsktra(test, 2);
var test2 = testCase2();
dijsktra(test2, 5);

































