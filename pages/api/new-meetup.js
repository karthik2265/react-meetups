// api/new-meetup
// POST
import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body
    const client = await MongoClient.connect(
      'mongodb+srv://karthik:admin@cluster0.ovvz5.mongodb.net/meetupsDB?retryWrites=true&w=majority'
    )
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    await meetupsCollection.insertOne(data)
    client.close()

    res.status(200).json({ message: 'successfully added to mongoDB' })
  }
}

export default handler
