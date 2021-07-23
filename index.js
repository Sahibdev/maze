(function (app) {

   
    var mazeGenerator = function () {
        var maze = [],
            pillarCoords = {
                row: [4, 8, 16, 20],
                col: [2, 4, 6, 8, 10, 12, 14]
            },

            //userCoords = startCoords;

            startCoords = {
                row: 0,
                col: 7
            },

            finishCoords = {
                row: 24,
                col: 11
            },

            doors = [
                [12, 7]
            ],
            dirs = {
                left: [{
                    row: 0,
                    col: -1
                }],
                up: [{
                    row: -1,
                    col: 0
                }, {
                    row: -2,
                    col: 0
                }, {
                    row: -3,
                    col: 0
                }],
                right: [{
                    row: 0,
                    col: 1
                }],
                down: [{
                    row: 1,
                    col: 0
                }, {
                    row: 2,
                    col: 0
                }, {
                    row: 3,
                    col: 0
                }]
            },
            row,
            cells,
            border,
            col;

        for (row = 0; row < 25; row += 1) {
            cells = [];
            maze.push(cells);
            for (col = 0; col < 17; col += 1) {
                border = row === 0 || row === 24 || row === 12 || col === 0 || col === 16;
                cells.push(border ? 1 : 0);
            }
        }
        

        maze[startCoords.row][startCoords.col] = 3;
        maze[finishCoords.row][finishCoords.col] = 4;

        angular.forEach(doors, function (door) {
            maze[door[0]][door[1]] = 0;
        });


        function getDirection(seed) {
            if (seed < 0.25) return dirs.left;
            if (seed < 0.5) return dirs.up;
            if (seed < 0.75) return dirs.right;
            return dirs.down;
        }

        angular.forEach(pillarCoords.row, function (pillarRow) {
            angular.forEach(pillarCoords.col, function (pillarCol) {
                var x = 0,
                    dir, rand = Math.random();
                maze[pillarRow][pillarCol] = 2;
                while (x < 10) {
                    x += 1;
                    dir = getDirection(rand);
                    if (maze[pillarRow + dir[0].row][pillarCol + dir[0].col] === 1) {
                        continue;
                    }
                    angular.forEach(dir, function (offset) {
                        maze[pillarRow + offset.row][pillarCol + offset.col] = 1;
                    });
                    break;
                }
            });
        });

        return maze;
    };

    function MazeController() {}

    angular.extend(MazeController.prototype, {
        userCoords: {
            row: 0,
            col: 7
        },

        finishCoords: {
            row: 24,
            col: 11
        },

        maze: mazeGenerator(this.userCoords),
        newMaze: function () {
            this.maze = mazeGenerator();
            this.userCoords.row = 0;
            this.userCoords.col = 7;
        },

        userdown: function (){
            //console.log(this.userCoords);
            if ( this.maze[this.userCoords.row + 1][this.userCoords.col] === 0){
                this.maze[this.userCoords.row][this.userCoords.col] = 0;
                ++this.userCoords.row;
                this.maze[this.userCoords.row][this.userCoords.col]=3;
            }
            else if (this.maze[this.userCoords.row + 1][this.userCoords.col] === 4)
            {
                window.alert("Maze Solved");
                this.maze = mazeGenerator();
                this.userCoords.row = 0;
                this.userCoords.col = 7;
            }
        },

        userup: function (){
            //console.log(this.userCoords);
            if ( this.maze[this.userCoords.row - 1][this.userCoords.col] === 0  && this.userCoords.row != 0 ){
                this.maze[this.userCoords.row][this.userCoords.col] = 0;
                --this.userCoords.row;
                this.maze[this.userCoords.row][this.userCoords.col]=3;
            }
        },

        userleft: function (){
            //console.log(this.userCoords);
            if ( this.maze[this.userCoords.row][this.userCoords.col - 1] === 0){
                this.maze[this.userCoords.row][this.userCoords.col] = 0;
                --this.userCoords.col;
                this.maze[this.userCoords.row][this.userCoords.col]=3;
                
            }
        },

        userright: function (){
            //console.log(this.userCoords);
            if ( this.maze[this.userCoords.row][this.userCoords.col + 1] === 0){
                this.maze[this.userCoords.row][this.userCoords.col] = 0;
                ++this.userCoords.col;
                this.maze[this.userCoords.row][this.userCoords.col]=3;
            }
            else if (this.maze[this.userCoords.row][this.userCoords.col + 1] === 4)
            {
                window.alert("Maze Solved");
                this.maze = mazeGenerator();
                this.userCoords.row = 0;
                this.userCoords.col = 7;
            }
        },

        loadmaze: function(){
            this.userCoords.row = 1;
            this.userCoords.col = 0;
            this.finishCoords.row = 10;
            this.finishCoords.col = 11;
            this.maze = [ 
                [1,1,1,1,1,1,1,1,1,1,1],
                [3,0,1,0,0,0,1,0,0,0,1],
                [1,0,1,0,1,0,1,0,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,1],
                [1,1,1,1,1,1,1,1,1,0,1],
                [1,0,1,0,0,0,0,0,0,0,1],
                [1,0,1,0,1,1,1,1,1,1,1],
                [1,0,1,0,0,0,1,0,0,0,1],
                [1,0,1,0,1,0,1,1,1,0,1],
                [1,0,0,0,1,0,0,0,0,0,4],
                [1,1,1,1,1,1,1,1,1,1,1]
            ];
        },

        solve: function(){
            while((this.maze[this.userCoords.row][this.userCoords.col + 1] != 4))
            {
                if( this.maze[this.userCoords.row][this.userCoords.col + 1] === 0) {
                    ++this.userCoords.col;
                    this.maze[this.userCoords.row][this.userCoords.col]=3;    
                }
                else if ( this.maze[this.userCoords.row + 1][this.userCoords.col] === 0){
                    ++this.userCoords.row;
                    this.maze[this.userCoords.row][this.userCoords.col]=3;
                }
                else if ( this.maze[this.userCoords.row - 1][this.userCoords.col] === 0  && this.userCoords.row != 0 ){
                    --this.userCoords.row;
                    this.maze[this.userCoords.row][this.userCoords.col]=3;
                }
                else if( this.maze[this.userCoords.row][this.userCoords.col - 1] === 0){
                    --this.userCoords.col;
                    this.maze[this.userCoords.row][this.userCoords.col]=3; 
                }
                else{
                console.log("Strick save me");
                break;
                }
                console.log(this.userCoords);
            }
        }
    });

    app.controller('mazeCtrl', MazeController);

})(angular.module('mazemaker', []));