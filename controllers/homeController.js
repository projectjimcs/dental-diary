const index = (req, res) => {
    res.render('index', { title: 'Express' });
}

export {
    index,
}