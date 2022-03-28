import React, { Fragment } from 'react'
import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

const MeetupDetailsPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
      </Head>
      <MeetupDetails {...props} />
    </Fragment>
  )
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: { meetupId: 'm1' },
      },
    ],
  }
}

export async function getStaticProps(context) {
  const id = context.params.meetupId
  const client = await MongoClient.connect(
    'mongodb+srv://karthik:admin@cluster0.ovvz5.mongodb.net/meetupsDB?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const data = await meetupsCollection.findOne({ _id: ObjectId(id) })
  client.close()
  return {
    props: {
      image: data.image,
      title: data.title,
      description: data.description,
      address: data.address,
    },
  }
}

export default MeetupDetailsPage
