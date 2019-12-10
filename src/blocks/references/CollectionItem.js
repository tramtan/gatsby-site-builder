import React from 'react'
import { graphql } from 'gatsby'

import { locales } from '../../utils/siteSettings.json'

import { internalJson } from '../../utils'
import { mapStyle } from '../../utils/processCss'

// import MusicListEntry from "./collectionItems/MusicListEntry";
import DefaultListEntry from './collectionItems/DefaultListEntry'
import ClassicRowListEntry from './collectionItems/ClassicRowListEntry'
import TestimonialListEntry from './collectionItems/TestimonialListEntry'
import EventListEntry from './collectionItems/EventListEntry'

const CollectionItem = ({
  collectionItem,
  colors,
  layout,
  blockOptionsData,
  passCSS,
}) => {
  const { options: optionsData, style: styleData } = collectionItem
  const options = internalJson(optionsData)
  const style = mapStyle(internalJson(styleData))

  if (Object.keys(collectionItem).length < 1) {
    return null
  }
  if (!collectionItem.featuredImage || !collectionItem.name) {
    return null
  }

  const path =
    collectionItem.path ||
    (locales.length > 1
      ? collectionItem.fields.localizedPath
      : collectionItem.fields.shortPath)

  const propsToPass = {
    collectionItem: { ...collectionItem, path },
    colors,
    styleData: style,
    layout,
    blockOptionsData,
    optionsData: options,
    passCSS,
  }

  switch (layout.name) {
    case `classicRow`:
      return <ClassicRowListEntry {...propsToPass} />
    case `testimonial`:
      return <TestimonialListEntry {...propsToPass} />
    case `event`:
      return <EventListEntry {...propsToPass} />
    case ``:
    case `default`:
      return <DefaultListEntry {...propsToPass} />
    default:
      return null
  }
}

export default CollectionItem

export const collectionItemsFragment = graphql`
  fragment CollectionItem on ContentfulCollectionItem {
    id
    internal {
      type
    }
    type
    name
    author
    featuredImage {
      id
      title
      description
      fluid(maxWidth: 1000, maxHeight: 1000, quality: 80) {
        base64
        aspectRatio
        src
        srcSet
        sizes
      }
    }
    content {
      id
      childMarkdownRemark {
        id
        excerpt(pruneLength: 200)
        html
      }
    }
    datePublished
    dateLastEdit
    categories
    metadata {
      internal {
        content
      }
    }
    options {
      internal {
        content
      }
    }
    style {
      internal {
        content
      }
    }
    node_locale
    fields {
      menuName
      shortPath
      localizedPath
      locale
    }
  }
`
