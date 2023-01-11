import React from 'react'
import {useMutation} from '@apollo/client'
import {Text, TouchableOpacity, View} from 'react-native'
import * as Sentry from '@sentry/react-native'

import {
  FOLLOW_DAO,
  GET_DAO_DETAIL,
  GET_PROPOSALS,
  GET_USER_INFO,
  UNFOLLOW_DAO,
  handleHTTPError,
} from '../../services/api'
import styles from './styles'
import CheckMarkSvg from './../../assets/images/svg/CheckMark.svg'

type FollowProps = {
  daoId: string
  userFollowed: boolean
  welcomeScreen?: boolean
}

const Follow = ({daoId, userFollowed, welcomeScreen}: FollowProps) => {
  const [followed, setFollowed] = React.useState<boolean>(userFollowed)

  // refetch querys that don't return the id of the dao that was changed
  const [followDao] = useMutation(FOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(true)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {
        query: GET_PROPOSALS,
        variables: {first: 5, after: '', onlyFollowedDaos: true},
      },
      {
        query: GET_DAO_DETAIL,
        variables: {ids: [daoId], onlyMain: true},
      },
    ],
  })

  // refetch querys that don't return the id of the dao that was changed
  const [unfollowDao] = useMutation(UNFOLLOW_DAO, {
    onCompleted: res => {
      setFollowed(false)
    },
    onError: error => {
      Sentry.captureException(error)
      console.error(error)
      handleHTTPError()
    },
    refetchQueries: [
      {query: GET_USER_INFO, variables: {onlyMain: true}},
      {
        query: GET_PROPOSALS,
        variables: {first: 5, after: '', onlyFollowedDaos: true},
      },
      {
        query: GET_DAO_DETAIL,
        variables: {ids: [daoId], onlyMain: true},
      },
    ],
  })

  React.useEffect(() => {
    setFollowed(userFollowed)
  }, [userFollowed])

  const handleClick = async () => {
    if (followed) {
      setFollowed(false)
      await unfollowDao({
        variables: {
          unfollowDaoDaoId2: daoId,
        },
      })
    } else {
      setFollowed(true)
      await followDao({
        variables: {
          daoId: daoId,
        },
      })
    }
  }

  // TODO change it
  return welcomeScreen ? (
    <TouchableOpacity
      onPress={handleClick}
      style={
        userFollowed ? styles.followedBackground : styles.followBackground
      }>
      {userFollowed && (
        <View style={styles.svg}>
          <CheckMarkSvg />
        </View>
      )}
      <Text style={styles.followText}>
        {userFollowed ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handleClick}
      style={followed ? styles.followedBackground : styles.followBackground}>
      {followed && (
        <View style={styles.svg}>
          <CheckMarkSvg />
        </View>
      )}
      <Text style={styles.followText}>{followed ? 'Following' : 'Follow'}</Text>
    </TouchableOpacity>
  )
}

export default Follow
