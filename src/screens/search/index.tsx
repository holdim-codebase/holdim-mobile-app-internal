import * as React from 'react'
import {
  Image,
  NativeScrollEvent,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {useQuery} from '@apollo/client'
import SearchBar from 'react-native-dynamic-search-bar'
import * as Sentry from '@sentry/react-native'

import {TDAO} from '../../types'
import {GET_DAO_LIST, handleHTTPError} from '../../services/api'
import {convertURIForLogo} from '../feed'

// components
import Follow from '../../components/Follow'
import LoadingSpinner from '../../components/LoadingSpinner'

// styles
import styles from './styles'
import {purple} from '../../constants/css'
import Smile from '../../assets/images/svg/SmileSearch.svg'

function SearchScreen({navigation}: any) {
  const [daoList, setDaoList] = React.useState<TDAO[]>([])
  const [textInSearchBar, setTextInSearchBar] = React.useState<string>('')

  // states for pagination
  const [endCursor, setEndCursor] = React.useState<string>('')
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState<boolean>(false)

  const {
    loading: loadingDaoList,
    fetchMore,
    refetch,
  } = useQuery(GET_DAO_LIST, {
    variables: {
      first: 10,
      after: '',
      onlyMain: true,
      search: '',
    },
    onCompleted: res => {
      setDaoList(res.daosV2.edges.map((edge: {node: any}) => edge.node))
      setEndCursor(res.daosV2.pageInfo.endCursor)
      setHasNextPage(res.daosV2.pageInfo.hasNextPage)
      setFetchMoreLoading(false)
    },
    onError: error => {
      Sentry.captureException(error)
      handleHTTPError()
      console.error(error)
    },
  })

  const openDAODescription = (daoId: string) => {
    navigation.navigate('DAO', {daoId})
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    let paddingToBottom = 30
    paddingToBottom += layoutMeasurement.height

    return contentOffset.y >= contentSize.height - paddingToBottom
  }

  React.useEffect(() => {
    const getData = setTimeout(() => {
      refetch({first: 12, after: '', onlyMain: true, search: textInSearchBar})
    }, 500)

    return () => clearTimeout(getData)
  }, [textInSearchBar])

  return (
    <View style={styles.searchWrapper}>
      <SearchBar
        style={styles.searchBar}
        textInputStyle={styles.searchBarText}
        searchIconImageStyle={{tintColor: '#A195C2'}}
        clearIconImageStyle={{tintColor: 'white'}}
        placeholderTextColor="#8B81A6"
        placeholder="Search for DAO"
        onChangeText={(text: string) => setTextInSearchBar(text)}
        onClearPress={() => setTextInSearchBar('')}
      />
      {loadingDaoList ? (
        <LoadingSpinner
          style={styles.loadingWrapperFullScreen}
          size="large"
          color={purple}
        />
      ) : (
        <ScrollView
          style={styles.searchListWrapper}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              if (hasNextPage) {
                setFetchMoreLoading(true)
                fetchMore({
                  variables: {
                    first: 10,
                    after: endCursor,
                    onlyMain: true,
                    search: '',
                  },
                })
              }
            }
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={400}>
          {daoList.length !== 0 ? (
            daoList.map((dao, i) => {
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={() => openDAODescription(dao.id)}>
                  <View style={styles.searchDaoWrapper}>
                    <View style={styles.searchDaoLogoTextWrapper}>
                      <Image
                        style={styles.searchDaoLogo}
                        source={{uri: convertURIForLogo(dao.logo)}}
                      />
                      <View style={styles.searchDaoTextWrapper}>
                        <Text style={styles.searchDaoName}>{dao.name}</Text>
                        {dao.tokens && dao.tokens.length ? (
                          <Text style={styles.searchDaoPrice}>
                            {dao.tokens[0].symbol} {' '}<Text style={styles.searchDaoPriceClr}>{+Number(dao.tokens[0].price).toFixed(2)} USD</Text>
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.searchDaoFollowSvg}>
                      <Follow
                        daoId={dao.id}
                        userFollowed={dao.personalizedData.followed}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          ) : (
            <View style={styles.searchEmptyWrapper}>
              <Smile />
              <Text style={styles.searchEmptyTitle}>Project not found</Text>
              <Text style={styles.searchEmptyText}>
                We're sorry, but we couldn't find the project you mentioned. We
                advise you to check the name of the project and try again.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      {fetchMoreLoading && (
        <LoadingSpinner
          style={styles.loadingSpinner}
          size="small"
          color="rgba(132, 99, 223, 1)"
        />
      )}
    </View>
  )
}

export default SearchScreen
