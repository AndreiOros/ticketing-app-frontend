export function isLoggedIn() {
    return !!localStorage.getItem('authToken')
}

export function createDefaultBoard(boardData) {
    const board = { ...boardData }
    board.lists = [
        {
            title: 'To Do',
            cards: []
        },
        {
            title: 'Doing',
            cards: []
        },
        {
            title: 'Done',
            cards: []
        }
    ]
    return board
}
