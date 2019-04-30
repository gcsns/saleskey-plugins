module.exports = {
    linters: {
        '**/*.+(js|ts)': [
            'eslint --fix',
            'jest --findRelatedTests',
            'git add'
        ],
        '**/*.+(js|md|ts|css|sass|yml|yaml|scss|json)': [
            'prettier --write',
            'git add'
        ]
    }
}