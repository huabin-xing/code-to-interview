let parseTree = function(fileText) {
	var result = "put your result here";
	var errors = [];
    let sum = 0;
    let stack = [];
    let path = [];


    // format all strings to numbers
    let originalTree = fileText.split("\n");
    let tree = [];
    for (let i=0; i<originalTree.length; i++) {
        let treeNode = originalTree[i].split(",");
        if (treeNode.length>1) {
            tree.push(treeNode.map(function (t, k) {
                if (isNaN(t)) {
                    errors.push("Error: [Invalid Value] This should be numeric value in position[" + i + ", "+ k + "]");
                    return t;
                }
                return parseInt(t, 10);
            }));
        }
    }

    // unit testing for the value of sum of fruits
    let testSum = testParseTree(tree);

    // check the root if valid
    let root = tree.shift();
    if (!root || root[0]!=0 || root[1]>=0) {
        errors.push("Error: [Invalid Tree] Check the tree root or symbols in file!");
    } else {
        //Depth First Search (DFS) Traversal for a Tree
        stack.push(root);

        while (stack.length>0) {
            let treeNode = stack.pop();
            path.push(treeNode[0]);

            if (treeNode.length>2) {
                while (treeNode[2]>0) {
                    sum += treeNode[2];
                    treeNode.splice(2, 1);
                }

                if (treeNode[2]==0) {
                    treeNode.splice(2, 1);
                    stack.push(treeNode);

                    let isFound = false;
                    let i = 0;
                    while (!isFound && i<tree.length) {
                        if (tree[i][1] == treeNode[0]) {
                            isFound = true;
                            stack.push(tree[i]);
                            tree.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    if (!isFound) {
                        errors.push("Error: [Invalid Tree] Can not find the correct ChildNode for Node[" + treeNode[0] + "]!");
                    }
                }
            }
        }

        if (tree.length>0) {
            for (let i=0; i<tree.length; i++) {
                errors.push("Error: [Invalid Tree] Node[" + tree[i][0] + "] should have a ParentNode!");
            }
        }
    }

    // finally the return value
    if (errors.length>0) {
	    result = errors.join("<br>");
    } else {
        result = "The sum of fruits weights is <strong>" + sum + " </strong>!<br />";
        result += "After unit testing, the sum is <strong>" + (sum==testSum) + " </strong>!<br />";
        result += "My robot is using DFS traversal by this path: [ <strong>" + path.join("-->") + " </strong>]";
    }

	return result;
}

let readFile = function (evt) {
	let file = evt.target.files[0]; 

	if (file) {
	  let reader = new FileReader("\n");
	  reader.onload = function(e) { 
		document.getElementById('result').innerHTML = parseTree(e.target.result);
	  }
	  reader.readAsText(file);
	} else { 
	  document.getElementById('result').innerHTML = "Failed to load file";
	}
}

window.addEventListener("load", function () {
	document.getElementById('fileInput').addEventListener('change', readFile, false);
}, false);

let testParseTree = function (tree) {
    let sum = 0;
    for (let i=0; i<tree.length; i++) {
        for (let k=2; k<tree[i].length; k++) {
            sum += tree[i][k];
        }
    }
    return sum;
}