import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
// pages
import Loading from "../Loading/Loading"

import * as sightingService from '../../services/sightingService'


import styles from './SightingDetails.module.css' 




// compontents
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo"
import NewComment from "../../components/NewComment/NewComment"

//todo create styles to import
const SightingDetails = (props) => {
  const {sightingId} = useParams()
  const [sighting, setSighting] = useState(null)

  useEffect(() => {
    const fetchSighting = async () => {
      const data = await sightingService.show(sightingId)
      setSighting(data)
    }
    fetchSighting()
  }, [sightingId])

  const handleAddComment = async (commentFormData) => {
    const newComment = await sightingService.createComment(sightingId, commentFormData)
    setSighting({ ...sighting, comments: [...sighting.comments, newComment],})
  }

  if (!sighting) return <Loading />

  return (
    <main className={styles.container}>
      <article >
        <header>
          <h1>{sighting.title}</h1>
        </header>
        <span>
          <AuthorInfo content={sighting} />
        </span>
        <p>{sighting.details}</p>
      </article>
      <section>
        <h1>Comments</h1>
          <NewComment handleAddComment={handleAddComment} />
      </section>
    </main>
  )
}

export default SightingDetails