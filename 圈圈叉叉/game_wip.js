/*
    reset
    arguements: 無
    return: 沒有回傳值
    procedure: 將網頁中的控制項歸零，系統變數歸零或還原
    配分: 10
*/
function reset() {
    console.log('Reseting...');
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).value = '';
    }
    counter = 0;
    to_reset = false;
}
/*
    end_game
    arguements: board 棋盤
    return  : 1 = 使用者勝利，-1 = AI勝利，0 = 尚未結束
    procedure: 檢查游戲是否結束, 需考慮橫軸，縱軸及對角綫
    配分：15
*/
function end_game(board) {
    for (let i = 0; i < 3; i++) {
        horizontal = 0;
        for (let j = 0; j < 3; j++) {
            horizontal += board[i][j];
        }
        if (horizontal == 3) {
            return 1;
        }
        else if (horizontal == -3) {
            return -1;
        }
    }

    for (let i = 0; i < 3; i++) {
        vertical = 0;
        for (let j = 0; j < 3; j++) {
            vertical += board[j][i];
        }
        if (vertical == 3) {
            return 1;
        }
        else if (vertical == -3) {
            return -1;
        }
    }

    if (board[1][1] != 0) {
        diag = board[0][0] + board[1][1] + board[2][2];
        if (diag == 3) {
            return 1;
        }
        else if (diag == -3) {
            return -1;
        }
        diag = board[0][2] + board[1][1] + board[2][0];
        if (diag == 3) {
            return 1;
        }
        else if (diag == -3) {
            return -1;
        }
    }
    return 0;
}
/*
    get_valid_move
    arguements: board 棋盤
    return: 合法的棋步 【陣列】
    procedure: 尋找合法的棋步
*/
function get_valid_move(board) {
    let moves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                moves.push(i * 3 + j);
            }
        }
    }
    return moves;
}
/*
    ai_move
    arguements: board 棋盤
    return: ai選擇的棋步
    procedure: 挑選對ai最有利的棋步
    配分：隨機挑選 = 10，懂得防守 = 20，懂得攻擊 = 30
*/
function ai_move(board) {
    let valid_moves = get_valid_move(board);
    console.log('Valid moves:' + valid_moves);
    // attack
    for (let a = 0; a < valid_moves.length; a++) {
        index = valid_moves[a];
        j = index % 3;
        i = Math.floor(index / 3);
        //console.log(i + '-' + j);
        board[i][j] = -1;
        win = end_game(board);
        board[i][j] = 0;
        if (win == -1) {
            return index;
        }
    }
    // defense
    for (let a = 0; a < valid_moves.length; a++) {
        index = valid_moves[a];
        j = index % 3;
        i = Math.floor(index / 3);
        board[i][j] = 1;
        win = end_game(board);
        board[i][j] = 0;
        if (win == 1) {
            return index;
        }
    }
    // random move
    let random_index = Math.floor(Math.random() * valid_moves.length);
    return valid_moves[random_index];
}
/* 
    read_board
    arguements: 無
    return: 棋盤
    procedure: 從網頁讀取棋盤
    配分：10
*/
function read_board() {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j + 1;
            tmp = document.getElementById(index).value;
            if (tmp == '') {
                continue;
            }
            else if (tmp == 'O') {
                board[i][j] = -1;
            }
            else {
                board[i][j] = 1;
            }
        }
    }
    return board;
}
/*
    check
    arguements: loc 下棋的位置，board 棋盤
    return: true = 合法，false = 不合法
    procedure: 檢查該棋步是否合法
    配分：10
*/
function check(loc, board) {
    i = Math.floor(loc / 3);
    j = loc % 3;
    if (board[i][j] == 0) {
        return true;
    }
    else {
        return false;
    }
}
/*
    write_board
    arguements: board 棋盤
    return: 無
    procedure: 將棋盤（圈圈叉叉）寫入網頁
    配分: 5
*/
function write_board(board) {
    console.log('writing board');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            index = i * 3 + j + 1;
            if (board[i][j] == 1) {
                document.getElementById(index).value = 'X';
            }
            else if (board[i][j] == -1) {
                document.getElementById(index).value = 'O';
            }
        }
    }
}
/*
    update_board
    arguements: player 下這步棋的人【1:使用者 -1:AI】，loc 下棋的位置【一維陣列】，board 棋盤
    return: 無
    procedure: 將使用者或AI所下棋步的位置轉換到棋盤格位置
    配分: 10
*/
function update_board(player, loc, board) {
    console.log('Update board ' + loc + ' for playr ' + player);
    i = Math.floor(loc / 3);
    j = loc % 3;
    board[i][j] = player;
}
/*
    player_move
    arguements: id 棋盤格的index
    return: 無
    procedure: 點擊棋盤格所觸發之事件
    配分: 10
*/
function player_move(id) {
    if (to_reset)
        reset();
    console.log('Round ' + counter);
    let board = read_board();
    // console.table(board);
    valid_moves = get_valid_move(board);
    if (valid_moves.length == 1) {
        i = Math.floor(valid_moves[0] / 3);
        j = valid_moves[0] % 3;
        board[i][j] = 1;
        win = end_game(board);
        board[i][j] = 0;
        if (win == 0) {
            alert('【平手】，再來一盤！');
            to_reset = true;
        }
    }
    else {
        let valid = valid_moves.includes(id - 1);
        if (valid) {
            update_board(1, id - 1, board);
            counter += 1;
            console.table(board);
            win = end_game(board);
            if (win == 1) {
                write_board(board);
                alert('恭喜【玩家】勝利！');
                console.log(counter);
                to_reset = true;
            }
            else {
                console.log('AI turn');
                move_id = ai_move(board);
                update_board(-1, move_id, board);
                counter += 1;
                //console.table(board);
                win = end_game(board);
                write_board(board);
                if (win == -1) {
                    alert('恭喜【AI】勝利！');
                    to_reset = true;
                }
                console.log('Moved');
            }
        }
        else {
            alert('错误：下棋位置已占用');
        }
    }

}