import React from 'react'
import {Image, Modal, Text, View} from 'react-native'
import {useQuery} from '@apollo/client'
import * as Sentry from '@sentry/react-native'

import Follow from '../../../components/Follow'

import {GET_DAO_LIST, handleHTTPError} from '../../../services/api'
import {TDAO} from '../../../types'

import styles from './styles'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {convertUriToLogo} from '../../../utils/convertUriToLogo'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {darkGrape} from '../../../constants/css'
import {BlurView} from '@react-native-community/blur'

type NewDaoNotificationScreenProps = {
  daoIds: string[]
  isModalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const NewDaoNotificationModal = ({
  daoIds,
  isModalVisible,
  setModalVisible,
}: NewDaoNotificationScreenProps) => {
  const [newDaoList, setNewDaoList] = React.useState<TDAO[]>([])

  const numberOfNewDao = daoIds && daoIds.length

  const {loading: loadingDaoList} = useQuery(GET_DAO_LIST, {
    variables: {
      first: numberOfNewDao,
      after: '',
      onlyMain: true,
      search: '',
      ids: daoIds,
    },
    onCompleted: res => {
      setNewDaoList(res.daosV2.edges.map((edge: {node: any}) => edge.node))
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
      console.error(error)
    },
  })

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(!isModalVisible)
      }}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.mainTitle}>What's new?</Text>
          <Text style={styles.title}>New DAOs added</Text>
          <Text style={styles.text}>
            {
              'We’ve just added a bunch of new DAOs. Check it out and find the ones that interest you!'
            }
          </Text>
        </View>
        {loadingDaoList ? (
          <LoadingSpinner
            style={styles.loadingWrapperFullScreen}
            size="large"
            color={darkGrape}
          />
        ) : (
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.listWrapper}>
              {newDaoList.length !== 0
                ? newDaoList.map((dao, i) => (
                    <View
                      style={[
                        styles.daoWrapper,
                        i !== newDaoList.length - 1
                          ? styles.dividingLine
                          : null,
                      ]}
                      key={i}>
                      <View style={styles.daoLogoTextWrapper}>
                        <Image
                          style={styles.daoLogo}
                          source={{uri: convertUriToLogo(dao.logo)}}
                        />
                        <View style={styles.daoTextWrapper}>
                          <Text style={styles.daoName}>{dao.name}</Text>
                          {dao.tokens && dao.tokens.length ? (
                            <Text style={styles.daoPrice}>
                              {dao.tokens[0].symbol} |{' '}
                              {+Number(dao.tokens[0].price).toFixed(2)} USD
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <Follow
                        daoId={dao.id}
                        userFollowed={dao.personalizedData.followed}
                      />
                    </View>
                  ))
                : null}
            </ScrollView>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default NewDaoNotificationModal
