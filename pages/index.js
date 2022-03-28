import React, { Fragment } from 'react'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'

const HomePage = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Meet amazing developers and great oppurtunities in react world'
        />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://karthik:admin@cluster0.ovvz5.mongodb.net/meetupsDB?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const data = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: data.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
        }
      }),
    },
  }
}

export default HomePage
