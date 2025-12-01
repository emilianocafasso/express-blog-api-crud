const index = (req, res) => {
    res.send('Lista dei post')
}

const show = (req, res) => {
    res.send('Info del post ' + req.params.id)
}

const store = (req, res) => {
    res.send('Crea nuovo post')
}

const update = (req, res) => {
    res.send('Modifica del post ' + req.params.id)
}

const destroy = (req, res) => {
    res.send('Elimina post ' + req.params.id)
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}