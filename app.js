const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.use(express.json())

const postsRouter = require('./routers/posts')

app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send("Server")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

/*Milestone 1
Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store. 
Impostiamo il verbo e l’endpoint corretti
Selezioniamo il tab body e scegliamo il formato raw e JSON
Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post

Nota: se vogliamo avere delle immagini, inventiamole pure. 

Nota: ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: sarà il server (con l’aiuto del database) a fornirlo.

Milestone 2
Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.
Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log 

Milestone 3
Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.
Testiamolo con postman.

Milestone 4
Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse. */