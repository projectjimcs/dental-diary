const index = (req, res) => {
  res.render('index', { title: 'Dental Diary' });
}

export {
  index,
}