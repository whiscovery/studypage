const functions = require('firebase-functions')

var admin = require('firebase-admin')

var serviceAccount = require('./firebasekey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://whiscoverystudy.firebaseio.com'
})
const db = admin.database()

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const u ={
    email,
    displayName,
    photoURL,
    createdAt: new Date()
  }
  db.ref('users').child(uid).set(u)
})

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  db.ref('users').child(uid).remove()
})
