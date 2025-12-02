const posts = require('../posts');
const { post } = require('../routers/posts');

// INDEX - Restituisce tutta la lista dei post
const index = (req, res) => {
    console.log('Richiesta ricevuta: GET /posts');
    res.json(posts)
}

// SHOW - Restituisce post specifico
const show = (req, res) => {

    // recupero l'id dall' URL e lo trasformo in numero
    const id = parseInt(req.params.id)
    console.log(`Richiesta ricevuta: GET /posts/${id}`);

    const post = posts.find(post => post.id === id)

    if (!post) {
        console.log(`Post con ID ${id} non trovato`);
        return res.status(404).json({
            error: "Post non trovato",
            message: `Nessun post trovato con id ${id}`
        })
    }
    console.log(`Post con ID ${id} trovato: ${post.title}`);
    res.json(post)
}
// DESTROY - Elimina un singolo post
const destroy = (req, res) => {

    const id = parseInt(req.params.id)
    console.log(`Richiesta ricevuta: DELETE /posts/${id}`);

    const postIndex = posts.findIndex(post => post.id === id)

    if (postIndex === -1) {
        return res.json({
            error: "Post non trovato",
            message: `Eliminazione fallita, nessun post trovato con id ${id}`
        })
    }

    // Memorizzo il post che sto per eliminare per il log
    const postEliminato = posts[postIndex]

    // Elimino il post dall'array con uno splice
    posts.splice(postIndex, 1)

    console.log('Array posts dopo il DELETE:');
    console.log(posts);

    res.sendStatus(204);
}

// STORE - Creazione nuovo post
const store = (req, res) => {
    console.log('Richiesta ricevuta: POST /posts')
    console.log('Dati ricevuti nel body: ', req.body);


    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            error: 'Dati mancanti',
            message: 'Title e content sono obbligatori'
        })
    }

    // genero nuovo id
    const newId = posts[posts.length - 1].id + 1;

    // creo il post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // aggiungo all'array
    posts.push(newPost)

    console.log(`Nuovo post creato con ID: ${newId}`)

    // restituisco la risposta
    res.status(201).json(newPost)
}

// UPDATE - Modifica del singolo post 
const update = (req, res) => {
    console.log(`Richiesta ricevuta: PUT /posts/${id}`);
    console.log('Dati ricevuti: ', req.body);

    // trovo il post da modificare
    const postIndex = posts.findIndex(post => post.id === id)

    if (postIndex === -1) {
        console.log(`Nesusn post con id ${id} trovato`);
        return res.status(404).json({
            error: 'Post non trovato',
            message: `Impossibile aggiornare: nessun post con id ${id}`
        })
    }

    const previousPost = posts[postIndex]

    // aggiorno solo i campi forniti mantenendo gli altri
    const updatedPost = {
        ...previousPost,    // copio tutte le proprietà esistenti
        ...req.body,    // sovrascrivo con le nuove proprietà
        id: previousPost.id
    }

    // sostituisco il post aggiornato nell'array
    posts[postIndex] = updatedPost

    console.log(`Post con ID ${id} aggiornato`);
    console.log('Post prima: ', previousPost);
    console.log('Post dopo: ', updatedPost);

    // restituisco il post aggiornato
    res.json(updatedPost)
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}