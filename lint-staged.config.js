module.exports = {
    linters: {
        '**/*.+(js|ts|tsx|jsx)': [
            'eslint --fix',
            'jest --findRelatedTests',
            'git add'
        ],
        '**/*.+(js|md|ts|css|sass|yml|yaml|scss|json|tsx|jsx|html)': [
            'prettier --write',
            'git add'
        ]
    }
}