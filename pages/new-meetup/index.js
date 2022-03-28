import React, { Fragment } from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import Head from 'next/head'

const NewMeetupPage = () => {
  const router = useRouter()
  async function addMeetupHandler(data) {
    data = JSON.stringify(data)
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    })
    router.push('/')
  }
  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta name='description' content='Add a new meetup and have fun' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage
