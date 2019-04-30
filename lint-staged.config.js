module.exports = {
    linters: {
        '**/*.+(js|ts)': [
            'eslint --fix',
            'jest --findRelatedTests'
        ],
        '**/*.+(js|md|ts|css|sass|yml|yaml|scss|json)': [
            'prettier --write',
            'git add'
        ]
    }
}