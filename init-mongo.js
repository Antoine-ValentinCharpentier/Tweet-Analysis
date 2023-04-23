db = db.getSiblingDB('Tweet')

db.createUser({
    user: 'mongo',
    pwd: 'mongo',
    roles: [
      {
        role: 'readWrite',
        db: 'Tweet'
      },
    ]
  })