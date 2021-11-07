import React, { ReactElement } from 'react'
import { GetStaticProps } from 'next'

interface Props {
  id: Number,
  title: String
}

export default function index({}: Props): ReactElement {
  return (
    <div>
      index
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props:{
      posts:[
        {id:1, title:"test"}
      ]
    }
  }
}