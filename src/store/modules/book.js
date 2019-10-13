const book = {
    state: {
        fileName: '',
        menuVisible: false
      },
      mutations: {
        'SET_FILENAME': (state, fileName) => {
          state.fileName = fileName
        },
        'SET_MENUVSIBLE': (state, menuVisible) => {
            state.menuVisible = menuVisible
          }
      }
}

export default book
