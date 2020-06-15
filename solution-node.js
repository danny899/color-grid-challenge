const colors = Array('B', 'R', 'G', 'Y', 'S', 'P');
const ROW_NUM = 30
const COL_NUM = 20

function createGame(col, row) {
    return Array(col*row).fill()
        .map(
            (
            item,
            index,
            ) => ({
            colorId: (
                Math
                .floor(
                Math.random() * colors.length
                )
            ),
            id: index,
            x: index % col,
            y: Math.floor(index / col),
            })
        )
}

function collectSameColorNeighbourNodes(nodes) {
    function getNode(nodes, coordX, coordY) {
        return nodes.find(({
            x,
            y,
        }) => (
            x === coordX && y === coordY
        ))
    }

    return nodes.map(
        ({
        colorId,
        id,
        x,
        y,
        }) => ({
            id,
            colorId: colorId,
            east: (getNode(nodes, x + 1, y,)),
            north: (getNode(nodes, x, y - 1)),
            south: (getNode(nodes, x, y + 1,)),
            west: (getNode(nodes, x - 1, y,)),
            x: x,
            y: y
        })
    ).map(
        ({ id, colorId, east, north, south, west, x, y}) => ({
            adjacentNodes: ([east, north, south, west,].filter((adjacentNode) => (
                adjacentNode !== undefined && adjacentNode.colorId === colorId
            ))
        ),
        colorId,
        id,
        x,
        y})
    )
}

// get continous block for a given starting node
function getContinousBlock(nodeId, nodes) {
    var continousIds = []
    
    function getNextBlocks(nodeId, nodes) {
        if(continousIds.includes(nodeId)) {
           return []
        }
        var node = nodes.find(n => n.id === nodeId)
        continousIds = continousIds.concat(nodeId) 
        return node.adjacentNodes.map(n => n.id).filter(id => !continousIds.includes(id))
    }
    
    var nextVisits = getNextBlocks(nodeId, nodes)
    while(nextVisits !== undefined && nextVisits.length > 0) {
        var nextId = nextVisits.shift()
        if (!continousIds.includes(nextId)) {
            nextVisits = nextVisits.concat(getNextBlocks(nextId, nodes))
        }
    }
    return continousIds
}

function getAllContinousBlock(nodes) {
    // var allBlocks = []
    // nodes.forEach(n => {
    //     var block = getContinousBlock(n.id, nodes)
    //     allBlocks = allBlocks.concat({size: block.length, block: block})
    // })
    return nodes.map(n => ({
        block: getContinousBlock(n.id, nodes)
    }))
}

function findLargestContinousBlock(nodes) {
    return (getAllContinousBlock(nodes).sort((a, b) => (a.block.length - b.block.length)).pop())
}


function printNode(node, padding) {
    console.log(padding + "Node " + node.id + ": "  + "{ ")
    if(node.adjacentNodes !== undefined) {
        console.log(padding + "  adjacentNodes: [")
        node.adjacentNodes.forEach(n => printNode(n, padding + padding))
        console.log(padding + "  ], ")
    }
    console.log(padding + `   color: ${colors[node.colorId]}, x: ${node.x}, y: ${node.y}`)
    console.log(padding +"}")
}

function printColorBoard(nodes) {
    // var line = Array(COL_NUM).fill().map((item, index) => (`${index}`)).join(", ")
    var line = ""
    nodes.forEach(
        n => {
            if(n.x == 0) {
                console.log(line)
                line = ""
            } 
            // line += ((n.x) / 9 > 1 ? " " : "") + colors[n.colorId] + (n.x % COL_NUM == (COL_NUM-1) ? " " : ", ")
            line += colors[n.colorId] + (n.x % COL_NUM == (COL_NUM-1) ? " " : ", ")
        }
    )
}

function printResult(nodes, block) {
    // var line = Array(COL_NUM).fill().map((item, index) => (`${index}`)).join(", ")
    var line = ""
    nodes.forEach(
        n => {
            if(n.x == 0) {
                console.log(line)
                line = ""
            } 
            // line += ((n.x) / 9 > 1 ? " " : "") + colors[n.colorId] + (n.x % COL_NUM == (COL_NUM-1) ? " " : ", ")
            line += (block.includes(n.id) ? "=" : colors[n.colorId]) + (n.x % COL_NUM == (COL_NUM-1) ? " " : ", ")
        }
    )
}

var game = createGame(COL_NUM, ROW_NUM)
printColorBoard(game)
  
console.time("collect neighbour nodes")
var nodesWithNeighbours = collectSameColorNeighbourNodes(game)
console.timeEnd("collect neighbour nodes")

console.log(" ========================== START Find Largest Blocks ========================== ")
console.time("findLargestContinousBlock")
var largestBlock = findLargestContinousBlock(nodesWithNeighbours)
console.log(largestBlock)
console.timeEnd("findLargestContinousBlock")
console.log(" ========================== END Find Largest Blocks ========================== ")

printResult(game, largestBlock.block)
