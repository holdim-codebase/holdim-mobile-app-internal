import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

export const styles = StyleSheet.create({
  aiExlam: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: normalize(10),
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
  },
  aiExlamText: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: normalize(12),
    textTransform: 'uppercase',
    textAlign: 'right',
    lineHeight: normalize(16),
    color: '#A195C2',
    marginRight: normalize(10),
  },
})
